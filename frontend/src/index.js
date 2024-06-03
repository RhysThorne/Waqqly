import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import favicon from './favicon.ico';

const root = ReactDOM.createRoot(document.getElementById('root'));

document.title = 'Waqqly';

const link = document.createElement('link');
link.rel = 'icon';
link.href = favicon;

document.head.appendChild(link);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);