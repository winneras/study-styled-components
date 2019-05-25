import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './Components/App/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(App), document.getElementById('mount'));
});
