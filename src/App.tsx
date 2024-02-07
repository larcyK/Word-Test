import { Match, Switch, createSignal, onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import * as bootstrap from 'bootstrap';

import { WordTestTitle } from './WordTestTitle';
import AppTemplate from './AppTemplate';

import logo from '../public/images/icon-192x192.png';
import { right } from '@popperjs/core';

enum PageKind {
  HOME = 'home',
  WORD_TEST = 'word-test',
  PROFILE = 'profile',
  TEMPLATE = 'template',
}

const App: Component = () => {
  /**
   * This function was taken from the cheatsheet example of bootstrap.
   * You will most likely remove it if using this template.
   */
  const [pageKind, setPageKind] = createSignal(PageKind.HOME);

  return (
  <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container-fluid">
          <a
            class="navbar-brand"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            <img 
              src={logo}
              style={{ "margin-right": '10px' }}
              width="26"
              height="26"
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
                  onClick={(e) => {
                    e.preventDefault()
                    setPageKind(PageKind.HOME);
                    console.log('Home');
                  }}
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  onClick={(e) => {
                    e.preventDefault()
                    setPageKind(PageKind.WORD_TEST)
                  }}
                >
                  Word Test
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  onClick={(e) => {
                    e.preventDefault()
                    setPageKind(PageKind.PROFILE)
                  }}
                >
                  Profile
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  onClick={(e) => {
                    e.preventDefault()
                    setPageKind(PageKind.TEMPLATE)
                  }}
                >
                  Template
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
        <div ref={(tooltip) =>
          new bootstrap.Tooltip(tooltip, {
            selector: '[data-bs-toggle="tooltip"]',
          })
        }></div>
      </nav>
            
      <Switch fallback={<div>404</div>}>
        <Match when={pageKind() === PageKind.HOME}>
          <div>Home</div>
        </Match>
        <Match when={pageKind() === PageKind.WORD_TEST}>
          <WordTestTitle />
        </Match>
        <Match when={pageKind() === PageKind.PROFILE}>
          <div>Profile</div>
        </Match>
        <Match when={pageKind() === PageKind.TEMPLATE}>
          <AppTemplate />
        </Match>
      </Switch>
    </>
  );
};

export default App;
