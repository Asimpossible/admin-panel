import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { persistor, store } from './redux/store/index.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={<h2>Loading...</h2>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>
)
