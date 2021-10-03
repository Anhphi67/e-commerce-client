import React, { useEffect } from 'react';


import './css/style.scss';

import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';

import Home from './pages/Home';
import routes from './routes';
import {createBrowserHistory} from 'history';
import {
  HashRouter, BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom';

const browserHistory = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
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
      <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </React.Suspense>

      </Router>
    </>
  );
}
export default App;
