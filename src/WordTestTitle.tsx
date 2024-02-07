import { For, createSignal } from "solid-js";
import target1200 from "../public/json/target1200.json";

interface Word {
  id: number;
  eng: string;
  jpn: string;
}

interface WordBook {
  words: Word[];
  title: string;
}

const wordBooks: WordBook[] = [
  {
    title: "ターゲット1200",
    words: target1200.map((word: any) => {
      return {
        id: word.id,
        eng: word.english,
        jpn: word.japanese,
      };
    })
  },
];

export const WordTestTitle = () => {

  const [score, setScore] = createSignal(0);
  const [problemCount, setProblemCount] = createSignal(10);
  const [wordBook, setWordBook] = createSignal(wordBooks[0]);

  return (
    <div class="container-fluid">
      <h1>Word Test</h1>

      <div class="dropdown">
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
      <div class="input-group mb-3">
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
        class="btn btn-primary btn-lg"
        onClick={(e) => {
          e.preventDefault();
          console.log("Start");
        }}
      >
        Start
      </button>

    </div>
  );
};
