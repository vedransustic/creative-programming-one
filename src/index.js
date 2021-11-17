import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {TolgeeProvider} from "@tolgee/react";
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
      <TolgeeProvider
          staticData={{
              en: () => import('./i18n/en.json'),
              ru: () => import('./i18n/ru.json'),
          }}
          loadingFallback={<>Loading...</>}
      >
    <App />
      </TolgeeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
