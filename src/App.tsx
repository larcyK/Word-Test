import { Match, Switch, createSignal, onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import * as bootstrap from 'bootstrap';

import { SelectiveWordTest } from './SelectiveWordTest';
import AppTemplate from './AppTemplate';

import logo from '../public/images/icon-192x192.png';
import { right } from '@popperjs/core';
import { DescriptiveWordTest } from './DescriptiveWordTest';

import fonts from './Font.module.scss';

enum PageKind {
  HOME = 'home',
  SELECTIVE_WORD_TEST = 'selective-word-test',
  DESCRIPTIVE_WORD_TEST = 'descriptive-word-test',
  PROFILE = 'profile',
  TEMPLATE = 'template',
}

const App: Component = () => {
  /**
   * This function was taken from the cheatsheet example of bootstrap.
   * You will most likely remove it if using this template.
   */
  const [pageKind, setPageKind] = createSignal(PageKind.DESCRIPTIVE_WORD_TEST);

  type TabProps = {
    kind: PageKind;
    tabName: string;
  };

  const Tab: Component<TabProps> = (props) => {
    return (
      <li class="nav-item">
        <a
          class={`nav-link rounded-pill px-3 py-1 ${pageKind() === props.kind ? 'active bg-primary text-white shadow-sm bg-gradient' : ''}`}
          aria-current="page"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault();
            setPageKind(props.kind);
            const navbarCollapse = document.querySelector('.navbar-collapse');
            navbarCollapse.classList.remove('show');
            }}
            onMouseEnter={e => e.currentTarget.classList.add('bg-primary', 'bg-opacity-75')}
            onMouseLeave={e => e.currentTarget.classList.remove('bg-primary', 'bg-opacity-75')}
          >
          {props.tabName}
        </a>
      </li>
    );
  };

  const DropdownTab = () => {
    return (
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          onClick={(e) => e.preventDefault()}
          id="navbarDropdown2"
          role="button"
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
    );
  }

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
              width="26"
              height="26"
              class="d-inline-block align-text-top app-logo-img"
              alt="Word Test Logo"
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
              <Tab kind={PageKind.HOME} tabName="ホーム" />              
              <Tab kind={PageKind.SELECTIVE_WORD_TEST} tabName="選択式テスト" />
              <Tab kind={PageKind.DESCRIPTIVE_WORD_TEST} tabName="記述式テスト" />
              {/* <Tab kind={PageKind.PROFILE} tabName="Profile" />
              <Tab kind={PageKind.TEMPLATE} tabName="Template" />
              <DropdownTab />
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
              </li> */}
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
          <div class="container-fluid bg-body mx-auto">
            <h1 class={`${fonts["font-lubi"]} my-3`}>ホーム</h1>
          </div>
        </Match>
        <Match when={pageKind() === PageKind.SELECTIVE_WORD_TEST}>
          <SelectiveWordTest />
        </Match>
        <Match when={pageKind() === PageKind.DESCRIPTIVE_WORD_TEST}>
          <DescriptiveWordTest />
        </Match>
        {/* <Match when={pageKind() === PageKind.PROFILE}>
          <div>Profile</div>
        </Match>
        <Match when={pageKind() === PageKind.TEMPLATE}>
          <AppTemplate />
        </Match> */}
      </Switch>
    </>
  );
};

export default App;
