// main.jsx
import React from 'react'
 
// client/src/main.jsx or index.js
import 'leaflet/dist/leaflet.css';

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { store, persistor } from './redux/store';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')).render(
   
    <BrowserRouter>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
    </BrowserRouter>
   
)
 