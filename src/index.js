import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import About from './components/About';
import Checkout from './components/Checkout';
import Cra from './components/Cra';
import Employee from './components/Employee';
import NotFound from './components/NotFound';
import Product from './components/Product';
import Products from './components/Products';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { createBrowserHistory } from 'history';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

const tracingOrigins = [
  'localhost', 
  "empowerplant.io",
  /^\//
]

const history = createBrowserHistory();
const SentryRoute = Sentry.withSentryRouting(Route);

let config = {
  RELEASE: new Date().getMonth()+1 + "." + new Date().getDate(),
  environment: "test"
}
console.log(config)

// TODO move to /utils/sentry.js ir src/sentry.js
Sentry.init({ 
  dsn: "https://19349cefec81421f89ba3c572f5a1f59@o262702.ingest.sentry.io/5711949",
  integrations: [new Integrations.BrowserTracing({
    tracingOrigins: tracingOrigins,
    routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
  })],
  tracesSampleRate: 1.0,
  release: new Date().getMonth()+1 + "." + new Date().getDate(),
  environment: "test",
  beforeSend(event,hint) {
    console.log("beforeSend", event) 
    return event 
  }
});
// initializeSentry()

// TODO strict mode?
// TODO app rewire or npm run eject?
// TODO Disabling code-splitting, chunking?
// TODO react-scripts > config > webpack.config.js
// React-router in use here https://reactrouter.com/web/guides/quick-start
ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <div>
        {'<Navbar Start>'}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
            <li>
              <Link to="/cra">CreateReactApp Starter Page</Link>
            </li>
            <li>
              <Link to="/employee/jane">Employee/:name</Link>
            </li>
            <li>
              <Link to="/product/1">Product/:id</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        {'<Navbar End>'}
        </nav>

        {'<React-Router\'s Switch components appear below:>'}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/cra">
            <Cra />
          </Route>
          <SentryRoute path="/employee/:name" component={Employee}>
          </SentryRoute>
          <SentryRoute path="/product/:id" component={Product}>
          </SentryRoute>
          <Route path="/products">
            <Products />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

function Home() {
  return <h2>Home</h2>;
}

// If you don't want a navbar, then you can remove it altogether, it would look like this:
/*
ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
*/
