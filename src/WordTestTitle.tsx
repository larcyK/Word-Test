import { For, createSignal } from "solid-js";
import target1200 from "../public/json/target1200.json";
import target1900 from "../public/json/target1900.json";

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

export const WordTestTitle = () => {

  const [testActive, setTestActive] = createSignal(false);
  const [problems, setProblems] = createSignal([] as Problem[]);
  const [problemIndex, setProblemIndex] = createSignal(0);

  const [score, setScore] = createSignal(0);
  const [problemCount, setProblemCount] = createSignal(10);
  const [wordBook, setWordBook] = createSignal(wordBooks[0]);

  // wordBookの単語からランダムに4択問題を生成
  const generateProblems = () => {
    const words = wordBook().words;
    const problems: Problem[] = [];
    for (let i = 0; i < problemCount(); i++) {
      const word = words[Math.floor(Math.random() * words.length)];
      const choices = [word.jpn];
      while (choices.length < 4) {
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
  
  return (
    <div class="container-fluid bg-body">
      <h1>Word Test</h1>

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
        <input
          type="number"
          class="form-control"
          aria-label="問題数"
          value="10"
          onChange={(e) => {
            setProblemCount(parseInt(e.currentTarget.value));
          }}
        />
      </div>

      {/* start button */}
      <button
        class="btn btn-primary btn-lg my-3"
        onClick={(e) => {
          e.preventDefault();
          setProblems(generateProblems());
          setTestActive(true);
        }}
      >
        Start
      </button>

      {/* problem card */}
      <div class="card my-3">
        <div class="card-body">
          {testActive() && (
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
                        setProblemIndex(problemIndex() + 1);
                      }}
                    >
                      {choice}
                    </button>
                  )}
                </For>

                <div class="d-flex mt-3">
                  <button
                    class="btn btn-secondary mx-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setProblemIndex(problemIndex() + 1);
                    }}
                  >
                    Skip
                  </button>

                  <button
                    class="btn btn-danger mx-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setTestActive(false);
                      setProblemIndex(0);
                      setScore(0);
                    }}
                  >
                    End
                  </button>

                  <button
                    class="btn btn-warning mx-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setTestActive(false);
                      setProblemIndex(0);
                      setScore(0);
                    }}
                  >
                    Restart
                  </button>


                </div>
              </div>

              <div>
                Score: {score()} / {problemCount()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};
