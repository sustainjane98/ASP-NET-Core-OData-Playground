import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './styles.css';
import 'flowbite';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Wrappers } from '@odata-playground/odata/common';
import { Router } from './components/router';
import { ErrorBoundary } from 'react-error-boundary';
import {
  ERROR_DIALOG_ID,
  SomethingWentWrong,
} from '@odata-playground/odata/error';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<SomethingWentWrong />}>
      <Suspense>
        <Wrappers>
          <Router />
          <ReactQueryDevtools initialIsOpen={false} />
        </Wrappers>
      </Suspense>
    </ErrorBoundary>
    <div id={ERROR_DIALOG_ID} className="absolute top-0 left-0" />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
