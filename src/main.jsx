import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'

import App from './components/App.jsx'
import reducers from './reducers/index.js'

// Create store with traditional Redux setup
const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore)
const store = createStoreWithMiddleware(reducers)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
