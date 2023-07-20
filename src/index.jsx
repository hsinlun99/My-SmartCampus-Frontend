import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { CaptureConsole } from '@sentry/integrations'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

// 上線前記得註解！！！！
// import { worker } from './mocks/browser'
// worker.start()
// if (process.env.NODE_ENV === 'development') {
//   const { worker } = require('./mocks/browser.js')
//   worker.start()
// }

Sentry.init({
  dsn:
    (import.meta.env.NODE_ENV === 'production' &&
      import.meta.env.VITE_SENTRY_DSN) ||
    '',
  integrations: [
    new Integrations.BrowserTracing(),
    new CaptureConsole({ levels: ['error'] })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
