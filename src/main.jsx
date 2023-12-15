import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import blogStore from './store/store.js'
import { Provider } from 'react-redux'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={blogStore}>
      <App />
    </Provider>
  </React.StrictMode>,
)
