import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/style.scss';
import store from './Redux/store';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: positions.TOP_CENTER,
  timeout: 4000,
  offset: '30px',
  transition: transitions.SCALE
}

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style} className={options.type === 'info' ? 'alert-info' : options.type === 'success' ? 'alert-success' : 'alert-error'}>
    {/* {options.type === 'info' && '!'}
    {options.type === 'success' && ':)'}
    {options.type === 'error' && ':('} */}
    {message}
    <button onClick={close}>X</button>
  </div>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
