import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import { Provider } from 'react-redux'
import MessengerCustomerChat from 'react-messenger-customer-chat';


ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <div className="md:px-20 px-2 flex flex-col min-h-screen overflow-hidden bg-white">
          <App />
          <MessengerCustomerChat
            pageId="777339822403967"
            appId="2943963155841604"
          />
        </div>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
