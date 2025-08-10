import { For, createMemo, createSignal } from "solid-js";
import { Word, wordBooks } from "./WordBooks";
import { Row, Col, Button, Form } from "solid-bootstrap";
import fonts from "./Font.module.scss";
import { createStore } from "solid-js/store";
import { AnswerStatus, WordCard } from "./DescriptiveWordCard";
import prints from "./Print.module.scss";

export const DescriptiveWordTest = () => {

  const [testActive, setTestActive] = createSignal(false);

  const [wordBook, setWordBook] = createSignal(wordBooks[0]);
  const [problemCount, setProblemCount] = createSignal(20);
  const maxProblemCount = 100;

  const [startIndex, setStartIndex] = createSignal(991);
  const [endIndex, setEndIndex] = createSignal(1010);

  const [problems, setProblems] = createSignal<Word[]>([]);
  const [states, setStates] = createStore<AnswerStatus[]>([]);

  const [errorText, setErrorText] = createSignal("");

  const generateProblems = () => {
    const words = wordBook().words.slice(startIndex() - 1, endIndex());
    const selectedWords = words.sort(() => Math.random() - 0.5).slice(0, problemCount());
    setProblems(selectedWords);
    setStates(Array(selectedWords.length).fill(AnswerStatus.UNANSWERED));
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
      <div class="row">
      <div class="col-12 col-sm-9 col-lg-6">
      <div class="vstack gap-1">
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
      </div>
      </div>
    );
  };

  function TestHeader() {
  const countCorrect   = createMemo(() => states.filter(s => s === AnswerStatus.CORRECT).length);
  const countIncorrect = createMemo(() => states.filter(s => s === AnswerStatus.INCORRECT).length);
  const countPending   = createMemo(() => states.filter(s => s === AnswerStatus.PENDING).length);
  const countUnans     = createMemo(() => states.filter(s => s === AnswerStatus.UNANSWERED).length);

  return (
    <div class="my-3 py-2">
      {/* モバイル: コンパクト1行 */}
      <div class="d-flex align-items-center justify-content-between d-sm-none">
        <div class={`d-flex align-items-center gap-2 flex-wrap ${prints.noPrint}`}>
          <span class="badge rounded-pill text-bg-success px-2 py-1">O {countCorrect()}</span>
          <span class="badge rounded-pill text-bg-danger px-2 py-1">X {countIncorrect()}</span>
          <span class="badge rounded-pill text-bg-secondary px-2 py-1">? {countPending()}</span>
          <span class="badge rounded-pill text-bg-light text-muted px-2 py-1">未 {countUnans()}</span>
        </div>

        <div class="d-flex align-items-center gap-2 ms-auto">
          <small class="text-muted">範囲 {startIndex()}–{endIndex()}</small>
          <button class={`btn btn-outline-primary btn-sm ${prints.noPrint}`}
                  onClick={() => setTestActive(false)}>
            戻る
          </button>
        </div>
      </div>

      {/* sm以上: 余裕のあるフル表示 */}
      <div class="d-none d-sm-flex justify-content-between align-items-center">
        <div class={`d-flex gap-3 align-items-center ${prints.noPrint}`}>
          <span class="text-success fw-bold fs-5">正解: {countCorrect()} 問</span>
          <span class="text-danger fw-bold fs-5">不正解: {countIncorrect()} 問</span>
          <span class="text-secondary fw-bold fs-5">保留: {countPending()} 問</span>
          <span class="mx-2 d-none d-md-inline"
                style={{ "border-left":"2px solid #ccc", height:"1.5em", display:"inline-block" }} />
          <span class="text-muted fw-bold fs-5">未解答: {countUnans()} 問</span>
        </div>

        <div class="d-flex align-items-center gap-3 ms-auto">
          <span class="text-muted">{wordBook().title}</span>
          <span class="text-muted">範囲: {startIndex()}〜{endIndex()}</span>
          <button class={`btn btn-outline-primary btn-sm ${prints.noPrint}`}
                  onClick={() => setTestActive(false)}>
            問題作成画面へ戻る
          </button>
        </div>
      </div>
    </div>
  );}

  const TestPage = () => {

    return <>
      <div class="sticky-top bg-white" style={{ top: "56px", "z-index": 1020 }}>
        <TestHeader />
      </div>
      <Row class={`${prints.printCols2} g-3 mb-5 row-cols-1 row-cols-lg-2`}>
        <For each={problems()}>
          {(problem, index) => (
            <Col>
              <WordCard
                class={prints.avoidBreak}
                number={problem.id}
                problem={problem.eng}
                answer={problem.jpn}
                status={states[index()]}
                setStatus={(state) => setStates(index(), state)}
              />
            </Col>
          )}
        </For>
      </Row>
    </>;
  };

  return (
    <div class="container-fluid bg-body mx-auto">
      <div class="d-flex justify-content-between align-items-center my-3">
        <h1 class={fonts["font-lubi"]}>記述式テスト</h1>
        
        {testActive() && <>
          <div class={prints.noPrint}>
            <button class="btn btn-primary" onClick={() => window.print()}>
              <i class="bi bi-printer me-1"></i> 印刷 / PDFに保存
            </button>
          </div>

          <div class={`${prints.printOnly} ms-3`}>
            <label class="form-label mb-0 me-2">氏名:</label>
              <div
                style="width: 250px; border-bottom: 1px solid #666;"
              ></div>
          </div>
        </>}
      </div>

      {testActive() ? (
        <TestPage />
      ) : (
        <TestCreatePage />
      )}
    </div>

  );
};
