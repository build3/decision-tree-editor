import 'normalize.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import './global.css';

import App from './App.svelte';

const app = new App({
  target: document.querySelector('#app'),
});

export default app;
