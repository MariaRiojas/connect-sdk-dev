import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AmazonConnectAgent} from "./components/AmazonConnectAgent";


const root = ReactDOM.render(<AmazonConnectAgent />, document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
