import { Match, onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import * as bootstrap from 'bootstrap';

const App: Component = () => {

  return (
    <>
      {/* <header class="bd-header bg-dark py-3 d-flex align-items-stretch border-bottom border-dark"></header> */}
      <div class="bd-cheatsheet container-fluid bg-body">
        <div>
          <article class="my-3" id="navbar">
            <div class="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
              <h3>Navbar</h3>
              <a class="d-flex align-items-center" href="../components/navbar/">
                Documentation
              </a>
            </div>

            <div>
              <div class="bd-example">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                  <div class="container-fluid">
                    <a
                      class="navbar-brand"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        src="../assets/brand/bootstrap-logo-white.svg"
                        width="38"
                        height="30"
                        class="d-inline-block align-top"
                        alt="Bootstrap"
                        loading="lazy"
                        style="filter: invert(1) grayscale(100%) brightness(200%);"
                      />
                    </a>
                    <button
                      class="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                      class="collapse navbar-collapse"
                      id="navbarSupportedContent"
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
                            id="navbarDropdown"
                            aria-role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Dropdown
                          </a>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
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
                        <button class="btn btn-outline-dark" type="submit">
                          Search
                        </button>
                      </form>
                    </div>
                  </div>
                </nav>

                <nav class="navbar navbar-expand-lg navbar-dark bg-primary mt-5">
                  <div class="container-fluid">
                    <a
                      class="navbar-brand"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        src="../assets/brand/bootstrap-logo-white.svg"
                        width="38"
                        height="30"
                        class="d-inline-block align-top"
                        alt="Bootstrap"
                        loading="lazy"
                      />
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
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default App;
