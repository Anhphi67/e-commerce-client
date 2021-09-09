import React, { useEffect } from 'react';


import './css/style.scss';

import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';

import Home from './pages/Home';
import List from './pages/ListProduct';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import ProductDetails from './pages/ProductDetails';
import CartList from './pages/CartList';
import Payment from './pages/Payment';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';
import UserProfile from './pages/UserProfile';
import ReactDOM from "react-dom";
import {HashRouter,
  Switch,
Route,
useLocation
} from 'react-router-dom';

function App() {

  const location = useLocation();
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <HashRouter>
          <React.Suspense fallback={loading}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route  exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/reset-password">
          <ResetPassword />
        </Route>
        <Route exact path="/list/id/:id">
          <List />
        </Route>
        <Route path="/detail/id/:id">
          <ProductDetails />
        </Route>
        <Route exact path="/cart">
          <CartList />
        </Route>
        <Route exact path="/payment">
          <Payment />
        </Route>
        <Route exact path="/orderHis">
          <OrderHistory />
        </Route>
        <Route exact path="/orderDetail/id/:id">
          <OrderDetail />
        </Route>
        <Route exact path="/profile">
          <UserProfile />
        </Route>
      </Switch>
      </React.Suspense>
      </HashRouter>
    </>
  );
}

export default App;
