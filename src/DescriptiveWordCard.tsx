import { For, createMemo, createSignal } from "solid-js";
import { Component } from "solid-js";
import styles from "./DescriptiveWordCard.module.scss";
import prints from "./Print.module.scss";

export enum AnswerStatus {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  PENDING = "pending",
  UNANSWERED = "unanswered",
}

export interface WordCardProps {
  number: number;
  problem: string;
  answer: string;
  status: AnswerStatus;
  setStatus: (state: AnswerStatus) => void;
  class?: string;
}

const buttons = [
  { label: "O", active: AnswerStatus.CORRECT,   accent: "var(--bs-success)",   color: "success" },
  { label: "X", active: AnswerStatus.INCORRECT, accent: "var(--bs-danger)",    color: "danger" },
  { label: "?", active: AnswerStatus.PENDING,   accent: "var(--bs-secondary)", color: "secondary" }
];

interface IndexBoxProps {
  index: number;
}

const IndexBox: Component<IndexBoxProps> = (props) => {
  return (
    <div
      class="input-group-text bg-primary border border-primary text-white fw-bold justify-content-center p-0"
      style={{
        width: "42px",
        "font-size": "1rem",
        "box-sizing": "border-box",
      }}
    >
      {props.index}
    </div>
  );
}

interface ProblemBoxProps {
  problem: string;
}

const ProblemBox: Component<ProblemBoxProps> = (props) => {
  return (
    <div
      class="d-flex align-items-center justify-content-center
            border border-primary
            h-100 py-1"
      style={{
        flex: "1 1 0",
        "min-width": "80px",
        "min-height": "48px",
        "font-size": "1.25rem",
        "white-space": "normal",
        "word-break": "break-word",
        "box-sizing": "border-box"
      }}
      title={props.problem}
    >
      {props.problem}
    </div>
  );
}

interface AnswerBoxProps {
  answer: string;
}

const AnswerBox: Component<AnswerBoxProps> = (props) => {
  const [visible, setVisible] = createSignal(false);
  let lastPointer: string | null = null;

  return (
    <div
      class="d-flex align-items-center justify-content-center
             border border-primary rounded-3 rounded-start-0 h-100 py-1"
      style={{
        flex: "1 1 0",
        "min-width": "80px",
        "min-height": "48px",
        "font-size": "1rem",
        "white-space": "normal",
        "word-break": "break-word",
        color: visible() ? "var(--bs-danger)" : "transparent",
        transition: "color 0.2s ease",
        "user-select": "none",
        "touch-action": "pan-y" // 縦スクロールはOK、横操作で誤発火しにくく
      }}
      title={props.answer}

      // マウスだけ hover 表示
      onPointerEnter={(e) => {
        lastPointer = e.pointerType;
        if (e.pointerType === "mouse") setVisible(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setVisible(false);
      }}

      // タッチはタップでトグル（hoverは無視）
      onPointerUp={(e) => {
        lastPointer = e.pointerType;
        if (e.pointerType !== "mouse") {
          e.preventDefault();
          setVisible(v => !v);
        }
      }}
    >
      <div class={prints.noPrint}>
        {props.answer}
      </div>
    </div>
  );
}

interface AnswerStatusBoxProps {
  status: AnswerStatus;
  setStatus: (status: AnswerStatus) => void;
}

const AnswerStatusBox: Component<AnswerStatusBoxProps> = (props) => {
  return (
    /* <div class="btn-group gap-1" style={{ height: "48px" }} role="group">
      <For each={buttons}>
        {(btn, i) => (
          <button
            class={`
              btn btn-sm fw-bold py-0
              ${i() === 0 ? "rounded-3 rounded-end-0" : ""}
              ${i() === buttons.length - 1 ? "rounded-3 rounded-start-0" : ""}
              ${props.state === btn.active
                ? `btn-${btn.color}`
                : `btn-outline-${btn.color}`}
            `}
            style="font-size:1rem;"
            onClick={(e) => {
              e.preventDefault();
              props.setState(
                props.state === State.UNANSWERED ? btn.active : State.UNANSWERED
              );
            }}
          >
            {btn.label}
          </button>
        )}
      </For>
    </div> */
    <div class={styles.choicePill}>
      <For each={buttons}>
        {(btn) => (
          <button
            class={`${styles.choiceDot} ${
              props.status === btn.active ? styles.isActive : ""
            }`}
            style={{
              "--accent": btn.accent,
            }}
            onClick={(e) => {
              e.preventDefault();
              if (navigator.vibrate) {
                navigator.vibrate(50);
              }
              props.setStatus(
                props.status === btn.active ? AnswerStatus.UNANSWERED : btn.active
              );
            }}
          >
            {btn.label}
          </button>
        )}
      </For>
    </div>
    /* <button
      class={`
        ${styles.choiceSingle}
        ${props.state === State.CORRECT   ? styles.correct   : ""}
        ${props.state === State.INCORRECT ? styles.incorrect : ""}
        ${props.state === State.PENDING   ? styles.pending   : ""}
      `}
      onClick={(e) => { e.preventDefault(); cycle(); }}
    >
      {props.state === State.CORRECT ? "O" :
      props.state === State.INCORRECT ? "X" :
      props.state === State.PENDING ? "?" : "・"}
    </button> */
  );
}

export const WordCard: Component<WordCardProps> = (props) => {
  return (
    <div class={`d-flex align-items-stretch w-100 gap-1 ${props.class || ""}`}>
      {/* 左：番号+単語+答え */}
      <div class="input-group rounded-3 overflow-hidden flex-grow-1">
        {/* 番号（左端） */}
        <IndexBox
          index={props.number}
        />

        {/* 単語 */}
        <ProblemBox
          problem={props.problem}
        />

        {/* 入力欄 */}
        <AnswerBox
          answer={props.answer}
        />
      </div>

      {/* 右：O/X/? */}
      <div class={prints.noPrint}>
        <AnswerStatusBox
          status={props.status}
          setStatus={props.setStatus}
        />
      </div>
    </div>
  );
};