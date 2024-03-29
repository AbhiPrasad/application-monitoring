import { Component } from 'react';
import Context from '../utils/context';
import { Link } from 'react-router-dom';
import './nav.css';

import EPlogo from '../assets/empowerplant-logo.svg';

class Nav extends Component {
  static contextType = Context;

  render() {
    const { cart } = this.context;
    return (
      <>
        <nav id="top-nav" className="show-mobile">
          <div className="nav-contents">
            <Link to="/" id="home-link">
              <img src={EPlogo} className="logo" alt="logo" />
            </Link>

            <div id="top-right-links">
              <Link to="/products">Products</Link>
              <Link to="/cart">
                Cart
                {cart.items.length > 0 ? <span> (${cart.total}.00)</span> : ''}
              </Link>
            </div>
          </div>
        </nav>

        <nav id="top-nav" className="show-desktop">
          <div className="nav-contents">
            <Link to="/" id="home-link">
              <img src={EPlogo} className="logo" alt="logo" />
              Empower Plant
            </Link>

            <div id="top-right-links">
              <Link to="/products">Products</Link>
              <Link to="/cart">
                Cart
                {cart.items.length > 0 ? <span> (${cart.total}.00)</span> : ''}
              </Link>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Nav;
