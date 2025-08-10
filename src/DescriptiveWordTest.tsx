import { For, createSignal } from "solid-js";
import target1200 from "../public/json/target1200.json";
import target1900 from "../public/json/target1900.json";
import { start } from "@popperjs/core";
import { Word, wordBooks } from "./WordBooks";
import fonts from "./Font.module.scss";

interface Problem {
  word: Word;
  answer: string;
  choices: string[];
}

export const DescriptiveWordTest = () => {

  const [testActive, setTestActive] = createSignal(false);
  const [resultActive, setResultActive] = createSignal(false);

  const [problems, setProblems] = createSignal([] as Problem[]);
  const [problemIndex, setProblemIndex] = createSignal(0);

  const [score, setScore] = createSignal(0);
  const [problemCount, setProblemCount] = createSignal(10);
  const [choiceCount, setChoiceCount] = createSignal(4);
  const [wordBook, setWordBook] = createSignal(wordBooks[0]);

  const maxTime = 10;
  const [remainingTime, setRemainingTime] = createSignal(maxTime);

  // wordBookの単語からランダムに4択問題を生成
  const generateProblems = () => {
    const words = wordBook().words;
    const problems: Problem[] = [];
    for (let i = 0; i < problemCount(); i++) {
      const word = words[Math.floor(Math.random() * words.length)];
      const choices = [word.jpn];
      while (choices.length < choiceCount()) {
        const choice = words[Math.floor(Math.random() * words.length)].jpn;
        if (choices.indexOf(choice) === -1) {
          choices.push(choice);
        }
      }
      problems.push({
        word: word,
        answer: word.jpn,
        choices: choices.sort(() => Math.random() - 0.5),
      });
    }
    return problems;
  };

  const nextProblem = () => {
    if (problemIndex() + 1 < problemCount()) {
      setProblemIndex(problemIndex() + 1);
      startTimer();
    } else {
      setTestActive(false);
      setResultActive(true);
    }
  }

  const remainingTimePercentage = () => {
    return (remainingTime() / maxTime) * 100;
  }

  let timer: NodeJS.Timeout;

  const startTimer = () => {
    setRemainingTime(maxTime);
    clearInterval(timer);
    timer = setInterval(() => {
      if (remainingTime() > 0) {
        setRemainingTime(remainingTime() - 1);
      } else {
        nextProblem();
      }
    }, 1000);
  }

  const startTest = () => {
    setProblems(generateProblems());
    setProblemIndex(0);
    setScore(0);
    setResultActive(false);
    startTimer();
    setRemainingTime(maxTime);
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

  const WordBookDropdown_ = () => {
    return (
      <div class="input-group">
        <span class="input-group-text">単語帳</span>
        <div class="dropdown flex-grow-1">
          <select class="form-select form-select-lg py-2 text-center rounded-start-0 ">
              <For each={wordBooks}>
              {(wordBook) => (
                <option
                  value={wordBook.title}
                  onClick={(e) => {
                    e.preventDefault();
                    setWordBook(wordBook);
                  }}
                >
                  {wordBook.title}
                </option>
              )}
            </For>
          </select>
        </div>
      </div>
    );
  };

  class InputFieldProps {
    type: string;
    label: string;
    value: number;
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
            type={props.type}
            class="form-control"
            aria-label={props.label}
            value={problemCount()}
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

  const ProblemCountInput = () => {
    return (
      <InputField
        type="number"
        label="問題数"
        value={problemCount()}
        onChange={(e) => {
          setChoiceCount(parseInt(e.currentTarget.value));
        }}
      />
    );
  };

  const ChoiceCountInput = () => {
    return (
      <InputField
        type="number"
        label="選択肢数"
        value={choiceCount()}
        onChange={(e) => {
          setChoiceCount(parseInt(e.currentTarget.value));
        }}
      />
    );
  };

  return (
    <div class="container-fluid bg-body mx-auto">
      <h1 class={`${fonts["font-lubi"]} my-3`}>記述式テスト</h1>

      <div class="row g-3 my-3">
        {/* <div class="col-auto"> */}
          <WordBookDropdown_ />
        {/* </div> */}
        <div class="col-auto">
          <ProblemCountInput />
        </div>
        <div class="col-auto">
          <ChoiceCountInput />
        </div>
      </div>

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
              type="number"
              label="開始番号"
              value={221}
              onChange={(e) => {
                // Handle change if needed
              }}
            />
          </div>
          <div class="col-md-6">
            <InputField
              type="number"
              label="終了番号"
              value={370}
              onChange={(e) => {
                // Handle change if needed
              }}
            />
          </div>
        </div>

        {/* 問題数 */}
        <div class="row g-3 my-1">
          <ProblemCountInput />
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
          <button
            class="btn btn-primary btn-lg mb-3 flex-grow-1"
            onClick={(e) => {
              e.preventDefault();
              startTest();
            }}
          >
            Start
          </button>
        </div>

      </div>

      {/* problem card */}
      {testActive() && (
        <div class="card my-3">
          <div class="card-body">
            <div>
              <h5 class="card-title">
                {wordBook().title}
              </h5>
              <p class="card-text">{problemIndex() + 1}. {problems()[problemIndex()].word.eng}</p>
              <div class="list-group">
                <For each={problems()[problemIndex()].choices}>
                  {(choice) => (
                    <button
                      class="list-group-item list-group-item-action"
                      onClick={(e) => {
                        e.preventDefault();
                        if (choice === problems()[problemIndex()].answer) {
                          setScore(score() + 1);
                        }
                        nextProblem();
                      }}
                    >
                      {choice}
                    </button>
                  )}
                </For>
              </div>

              <div class="bd-example my-4">
                <div class="progress">
                  <div
                    class={`progress-bar progress-bar-striped progress-bar-animated ${remainingTime() < 3 ? "bg-danger" : "bg-success"
                      }`}
                    aria-role="progressbar"
                    style={`width: ${remainingTimePercentage()}%`}
                  ></div>
                </div>
              </div>

              <div class="d-flex mt-3">
                <button
                  class="btn btn-secondary mx-1"
                  onClick={(e) => {
                    e.preventDefault();
                    nextProblem();
                  }}
                >
                  Skip
                </button>

                <button
                  class="btn btn-danger mx-1"
                  onClick={(e) => {
                    e.preventDefault();
                    setTestActive(false);
                    setResultActive(true);
                  }}
                >
                  End
                </button>
              </div>

              <div class="d-flex mt-3 mx-1">
                Score: {score()} / {problemCount()}
              </div>
            </div>
          </div>
        </div>
      )}

      {resultActive() && (
        <div class="container-fluid bg-body">
          <h1>Result</h1>
          <div class="card my-3">
            <div class="card-body">
              <h5 class="card-title">
                {wordBook().title}
              </h5>
              <p class="card-text">
                Score: {score()} / {problemCount()}
              </p>
              <button
                class="btn btn-primary btn-lg"
                onClick={(e) => {
                  e.preventDefault();
                  startTest();
                }}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};
