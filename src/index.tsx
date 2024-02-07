/* @refresh reload */
import 'bootstrap/scss/bootstrap.scss';

import { render } from 'solid-js/web';

/**
 * This file was taken from the cheatsheet example of bootstrap.
 * You will most likely remove it if using this template.
 */
import './cheatsheet.scss';

import AppTemplate from './AppTemplate';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <AppTemplate />, root!);
