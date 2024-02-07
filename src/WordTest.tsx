

export const WordTest = () => {
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
          ターゲット1200
        </button>
        <ul
          class="dropdown-menu"
          aria-labelledby="dropdownMenuButtonLG"
        >
          <li>
            <h6 class="dropdown-header">Selct Wordbook</h6>
          </li>
          <li>
            <a
              class="dropdown-item"
              href=""
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              ターゲット1200
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}