import { For, createMemo, createSignal } from "solid-js";
import { Word, wordBooks } from "./WordBooks";
import { Component } from "solid-js";
import { Row, Col, Button, Form } from "solid-bootstrap";
import fonts from "./Font.module.scss";
import target1200 from "../public/json/target1200.json";
import styles from "./DescriptiveWordTest.module.scss";
import { createStore } from "solid-js/store";

enum State {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  PENDING = "pending",
  UNANSWERED = "unanswered",
}

interface WordCardProps {
  number: number;
  problem: string;
  answer: string;
  state: State;
  setState: (state: State) => void;
}

const buttons = [
  { label: "O", active: State.CORRECT,   accent: "var(--bs-success)",   color: "success" },
  { label: "X", active: State.INCORRECT, accent: "var(--bs-danger)",    color: "danger" },
  { label: "?", active: State.PENDING,   accent: "var(--bs-secondary)", color: "secondary" }
];

const WordCard: Component<WordCardProps> = (props) => {
  const [visible, setVisible] = createSignal(false);

  return (
    <div class="d-flex align-items-stretch w-100 gap-1">
      {/* 左：番号+単語+答え */}
      <div class="input-group rounded-3 overflow-hidden flex-grow-1">
        {/* 番号（左端） */}
        <span
          class="input-group-text bg-primary border border-primary text-white fw-bold justify-content-center p-0"
          style={{
            width: "42px",
            "font-size": "1rem",
            "box-sizing": "border-box",
          }}
        >
          {props.number}
        </span>

        {/* 単語 */}
        <div
          class="d-flex align-items-center justify-content-center
                border border-primary
                h-100"
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

        {/* 入力欄 */}
        <div
          class="d-flex align-items-center justify-content-center
                border border-primary
                rounded-3 rounded-start-0
                h-100"
          style={{
            flex: "1 1 0",
            "min-width": "80px",
            "min-height": "48px",
            "font-size": "1rem",
            "white-space": "normal",
            "word-break": "break-word",
            color: visible() ? "var(--bs-danger)" : "transparent",
            transition: "color 0.2s ease"
          }}
          title={props.answer}
          onClick={() => setVisible(!visible())}
          onMouseEnter={() => setVisible(true)} 
          onMouseLeave={() => setVisible(false)}
        >
          {props.answer}
        </div>

      </div>

      {/* 右：O/X/? */}
      {/* <div class="btn-group gap-1" style={{ height: "48px" }} role="group">
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
      </div> */}
      <div class={styles.choicePill}>
        <For each={buttons}>
          {(btn) => (
            <button
              class={`${styles.choiceDot} ${
                props.state === btn.active ? styles.isActive : ""
              }`}
              style={{
                "--accent": btn.accent,
              }}
              onClick={(e) => {
                e.preventDefault();
                props.setState(
                  props.state === btn.active ? State.UNANSWERED : btn.active
                );
              }}
            >
              {btn.label}
            </button>
          )}
        </For>
      </div>
      {/* <button
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
      </button> */}
    </div>
  );
};

export const DescriptiveWordTest = () => {

  const [testActive, setTestActive] = createSignal(false);

  const [wordBook, setWordBook] = createSignal(wordBooks[0]);
  const [problemCount, setProblemCount] = createSignal(20);
  const maxProblemCount = 100;

  const [startIndex, setStartIndex] = createSignal(991);
  const [endIndex, setEndIndex] = createSignal(1010);

  const [problems, setProblems] = createSignal<Word[]>([]);
  const [states, setStates] = createStore<State[]>([]);

  const [errorText, setErrorText] = createSignal("");

  const generateProblems = () => {
    const words = wordBook().words.slice(startIndex() - 1, endIndex());
    const selectedWords = words.sort(() => Math.random() - 0.5).slice(0, problemCount());
    setProblems(selectedWords);
    setStates(Array(selectedWords.length).fill(State.UNANSWERED));
  };
  
  const startTest = () => {
    if (problemCount() <= 0) {
      setErrorText("問題数は1以上に設定してください");
      return;
    }

    if (startIndex() < 1 || endIndex() > wordBook().words.length || startIndex() > endIndex()) {
      setErrorText("開始番号と終了番号を正しく設定してください");
      return;
    }

    if (problemCount() > (endIndex() - startIndex() + 1)) {
      setErrorText("問題数は開始番号と終了番号の範囲内で設定してください");
      return;
    }

    if (problemCount() > maxProblemCount) {
      setErrorText(`問題数は最大${maxProblemCount}までです`);
      return;
    }

    setErrorText("")
    generateProblems();
    setTestActive(true);
  }

  class DropdownFieldProps {
    title: string;
    description: string;
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
  }

  const DropdownField = (props: DropdownFieldProps) => {
    return (
      <div class="input-group">
        <span class="input-group-text">{props.title}</span>
        <div class="dropdown flex-grow-1">
          <button
            // class="btn btn-secondary btn-lg dropdown-toggle w-100 text-center rounded-start-0"
            class="btn border btn-lg dropdown-toggle w-100 text-center rounded-start-0"
            type="button"
            id="dropdownMenuButtonLG"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onMouseEnter={e => e.currentTarget.classList.add('bg-secondary', 'bg-opacity-10')}
            onMouseLeave={e => e.currentTarget.classList.remove('bg-secondary', 'bg-opacity-10')}
          >
            {props.selected || props.title}
          </button>
          <ul
            class="dropdown-menu w-100"
            aria-labelledby="dropdownMenuButtonLG"
          >
            <li>
              <h6 class="dropdown-header">{props.description}</h6>
            </li>
            <For each={props.options}>
              {(option) => (
                <li>
                  <a
                    class="dropdown-item"
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      props.onSelect(option);
                    }}
                  >
                    {option}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    );
  };

  class InputFieldProps {
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }) => void;
  }

  const InputField = (props: InputFieldProps) => {
    return (
      <div class="input-group">
        <span class="input-group-text">{props.label}</span>
        {/* <div class="col-xs-4"> */}
          <input
            type="number"
            class="form-control"
            aria-label={props.label}
            value={props.value}
            min={props.min}
            max={props.max}
            step={props.step}
            style={{
              "border-top-left-radius": "0rem",
              "border-bottom-left-radius": "0rem",
            }}
            onChange={(e) => {
              props.onChange(e);
            }}
          />
        {/* </div> */}
      </div>
    );
  };

  const TestCreatePage = () => {
    return (
      <div class="vstack gap-100 w-50">
        {/* 教材を選択 */}
        <div>
            {/* <WordBookDropdown /> */}
          <DropdownField
            title="単語帳"
            description="Select Wordbook"
            options={wordBooks.map(wb => wb.title)}
            selected={wordBook().title}
            onSelect={(value) => {
              const selectedBook = wordBooks.find(wb => wb.title === value);
              if (selectedBook) {
                setWordBook(selectedBook);
              }
            }}
          />
        </div>
        
        {/* 開始番号と終了番号 */}
        <div class="row g-3 my-1">
          <div class="col-md-6">
            <InputField
              label="開始番号"
              min={startIndex()}
              max={Math.min(endIndex(), wordBook().words.length)}
              step={1}
              value={startIndex()}
              onChange={(e) => {
                setStartIndex(parseInt(e.currentTarget.value));
              }}
            />
          </div>
          <div class="col-md-6">
            <InputField
              label="終了番号"
              value={endIndex()}
              min={startIndex()}
              max={wordBook().words.length}
              step={1}
              onChange={(e) => {
                setEndIndex(parseInt(e.currentTarget.value));
              }}
            />
          </div>
        </div>

        {/* 問題数 */}
        <div class="row g-3 my-1">
          <InputField
            label="問題数"
            min={1}
            max={Math.min(problemCount(), endIndex() - startIndex() + 1)}
            step={1}
            value={problemCount()}
            onChange={(e) => {
              setProblemCount(parseInt(e.currentTarget.value));
            }}
          />
        </div>

        {/* 出題形式 */}
        {/* <div>
          <label class="form-label fw-semibold">出題形式</label>
          <select class="form-select form-select-lg rounded-4 py-3 text-center">
            <option selected>英語から日本語</option>
            <option>日本語から英語</option>
          </select>
        </div> */}

        {/* 開始ボタン */}
        <div class="row g-3 my-1">
          <div class="col-12">
            <button
              class="btn btn-primary btn-lg w-100"
              onClick={(e) => {
                e.preventDefault();
                startTest();
              }}
            >
              Start
            </button>
          </div>
        </div>

        {/* エラーメッセージ */}
        <div class="text-danger mt-3 px-2 fw-bold">
          {errorText()}
        </div>
      </div>
    );
  };

  const items = target1200.slice(101, 110).map((word, index) => ({
    number: index + 1,
    problem: word.english,
    answer: word.japanese,
  }));

  function TestHeader() {
  const countCorrect   = createMemo(() => states.filter(s => s === State.CORRECT).length);
  const countIncorrect = createMemo(() => states.filter(s => s === State.INCORRECT).length);
  const countPending   = createMemo(() => states.filter(s => s === State.PENDING).length);
  const countUnans     = createMemo(() => states.filter(s => s === State.UNANSWERED).length);

  return (
    <div class="my-3">
      {/* モバイル: コンパクト1行 */}
      <div class="d-flex align-items-center justify-content-between d-sm-none">
        <div class="d-flex align-items-center gap-2 flex-wrap">
          <span class="badge rounded-pill text-bg-success">正 {countCorrect()}</span>
          <span class="badge rounded-pill text-bg-danger">不 {countIncorrect()}</span>
          <span class="badge rounded-pill text-bg-secondary">保 {countPending()}</span>
          <span class="badge rounded-pill text-bg-light text-muted">未 {countUnans()}</span>
        </div>

        <div class="d-flex align-items-center gap-2 ms-2">
          <small class="text-muted">範囲 {startIndex()}–{endIndex()}</small>
          <button class="btn btn-outline-primary btn-sm"
                  onClick={() => setTestActive(false)}>
            戻る
          </button>
        </div>
      </div>

      {/* sm以上: 余裕のあるフル表示 */}
      <div class="d-none d-sm-flex justify-content-between align-items-center">
        <div class="d-flex gap-3 align-items-center">
          <span class="text-success fw-bold fs-5">正解: {countCorrect()} 問</span>
          <span class="text-danger fw-bold fs-5">不正解: {countIncorrect()} 問</span>
          <span class="text-secondary fw-bold fs-5">保留: {countPending()} 問</span>
          <span class="mx-2 d-none d-md-inline"
                style={{ "border-left":"2px solid #ccc", height:"1.5em", display:"inline-block" }} />
          <span class="text-muted fw-bold fs-5">未解答: {countUnans()} 問</span>
        </div>

        <div class="d-flex align-items-center gap-3">
          <span class="text-muted">問題範囲: {startIndex()}〜{endIndex()}</span>
          <button class="btn btn-outline-primary btn-sm"
                  onClick={() => setTestActive(false)}>
            問題作成画面へ戻る
          </button>
        </div>
      </div>
    </div>
  );
}


  const TestPage = () => {

    return <>
      <TestHeader />
      <Row class="g-3 mb-3">
        <For each={problems()}>
          {(problem, index) => (
            <Col xs={12} lg={6}>
              <WordCard
                number={problem.id}
                problem={problem.eng}
                answer={problem.jpn}
                state={states[index()]}
                setState={(state) => {
                  setStates(index(), state);
                }}
              />
            </Col>
          )}
        </For>
      </Row>
    </>;
  };

  return (
    <div class="container-fluid bg-body mx-auto">
      <h1 class={`${fonts["font-lubi"]} my-3`}>記述式テスト</h1>

      {!testActive() && (
        <TestCreatePage />
      )}

      {/* problem card */}
      {testActive() && (
        <TestPage />
      )}
    </div>

  );
};
