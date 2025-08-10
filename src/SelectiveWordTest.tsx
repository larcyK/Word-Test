import { For, createSignal } from "solid-js";
import target1200 from "../public/json/target1200.json";
import target1900 from "../public/json/target1900.json";
import { start } from "@popperjs/core";

interface Word {
  id: number;
  eng: string;
  jpn: string;
}

interface WordBook {
  words: Word[];
  title: string;
}

interface Problem {
  word: Word;
  answer: string;
  choices: string[];
}

function jsonToWords(json: any): Word[] {
  return json.map((word: any) => {
    return {
      id: word.id,
      eng: word.english,
      jpn: word.japanese,
    };
  });
}

const wordBooks: WordBook[] = [
  {
    title: "ターゲット1200",
    words: jsonToWords(target1200),
  },
  {
    title: "ターゲット1900",
    words: jsonToWords(target1900),
  },
];

export const SelectiveWordTest = () => {

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

  return (
    <div class="container-fluid bg-body mx-auto">
      <h1 class="my-3">Word Test</h1>

      <div class="dropdown my-3">
        <button
          class="btn btn-secondary btn-lg dropdown-toggle"
          type="button"
          id="dropdownMenuButtonLG"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {wordBook().title}
        </button>
        <ul
          class="dropdown-menu"
          aria-labelledby="dropdownMenuButtonLG"
        >
          <li>
            <h6 class="dropdown-header">Selct Wordbook</h6>
          </li>
          <For each={wordBooks}>
            {(wordBook) => (
              <li>
                <a
                  class="dropdown-item"
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setWordBook(wordBook);
                  }}
                >
                  {wordBook.title}
                </a>
              </li>
            )}
          </For>
        </ul>
      </div>

      {/* problem range input form (min~max) */}
      <div class="input-group my-3">
        <span class="input-group-text">問題数</span>
        <div class="col-xs-4">
          <input
            type="number"
            class="form-control"
            aria-label="問題数"
            value={problemCount()}
            style={{
              "border-top-left-radius": "0rem",
              "border-bottom-left-radius": "0rem",
            }}
            onChange={(e) => {
              setProblemCount(parseInt(e.currentTarget.value));
            }}
          />
        </div>
      </div>

      <div class="input-group my-3">
        <span class="input-group-text">選択肢</span>
        <div class="col-xs-4">
          <input
            type="number"
            class="form-control"
            aria-label="選択肢数"
            value={choiceCount()}
            style={{
              "border-top-left-radius": "0rem",
              "border-bottom-left-radius": "0rem",
            }}
            onChange={(e) => {
              setChoiceCount(parseInt(e.currentTarget.value));
            }}
          />
        </div>
      </div>

      {/* start button */}
      <button
        class="btn btn-primary btn-lg mb-3"
        onClick={(e) => {
          e.preventDefault();
          startTest();
        }}
      >
        Start
      </button>

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
