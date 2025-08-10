// usePersistentSignal.ts
import { createSignal, onMount, onCleanup, Accessor } from "solid-js";

type StorageKind = "local" | "session";
type Options<T> = {
  storage?: StorageKind;                  // default: "local"
  serialize?: (v: T) => string;           // default: JSON.stringify
  deserialize?: (s: string) => T;         // default: JSON.parse
  syncAcrossTabs?: boolean;               // default: true
};

const isBrowser = typeof window !== "undefined";

export function createPersistentSignal<T>(
  key: string,
  initial: T,
  opts: Options<T> = {}
): [Accessor<T>, {
  (value: Exclude<T, Function>): T;
  (fn: (prev: T) => T): T;
}] {
  const {
    storage = "local",
    serialize = (v: T) => JSON.stringify(v),
    deserialize = (s: string) => JSON.parse(s) as T,
    syncAcrossTabs = true,
  } = opts;

  const store: Storage | null =
    !isBrowser ? null : storage === "local" ? window.localStorage : window.sessionStorage;

  // ① 初期値を先に決める（チラつき防止）
  let init = initial;
  if (store) {
    const raw = store.getItem(key);
    if (raw != null) {
      try { init = deserialize(raw); } catch { /* 壊れてたら初期値のまま */ }
    }
  }

  const [value, setValue] = createSignal<T>(init);

  // ② Setter 互換のオーバーロード
  function setAndPersist(next: Exclude<T, Function>): T;
  function setAndPersist(next: (prev: T) => T): T;
  function setAndPersist(next: any): T {
    const resolved: T =
      typeof next === "function" ? (next as (prev: T) => T)(value()) : (next as T);

    // setValue は updater 形式で渡すと T が関数でも安全
    setValue(() => resolved);

    if (store) {
      try { store.setItem(key, serialize(resolved)); } catch { /* quota等は無視 */ }
    }
    return resolved;
  }

  // ③ タブ間同期（別タブで変わったら反映）
  onMount(() => {
    if (!store || !syncAcrossTabs || !isBrowser) return;
    const handler = (e: StorageEvent) => {
      if (e.key !== key) return;
      if (e.newValue == null) {
        // クリアされた場合は初期値に戻す
        setValue(() => initial);
        return;
      }
      try { setValue(() => deserialize(e.newValue)); } catch { /* noop */ }
    };
    window.addEventListener("storage", handler);
    onCleanup(() => window.removeEventListener("storage", handler));
  });

  return [value, setAndPersist];
}
