import { onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import * as bootstrap from 'bootstrap';

const App: Component = () => {
  /**
   * This function was taken from the cheatsheet example of bootstrap.
   * You will most likely remove it if using this template.
   */
  return (
    <>

      <div ref={(tooltip) =>
        new bootstrap.Tooltip(tooltip, {
          selector: '[data-bs-toggle="tooltip"]',
        })
      }>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
          <div class="container-fluid">
            <a
              class="navbar-brand"
              href="/"
              onClick={(e) => e.preventDefault()}
            >
              <img 
                src="../public/images/icon-192x192.png"
                width="30"
                height="30"
                class="d-inline-block align-text-top" 
              />
              Word Test
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent2"
              aria-controls="navbarSupportedContent2"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse"
              id="navbarSupportedContent2"
            >
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    Link
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    id="navbarDropdown2"
                    aria-role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="navbarDropdown2"
                  >
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        Action
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link disabled"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Disabled
                  </a>
                </li>
              </ul>
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-light" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
            
    </>
  );
};

export default App;
