// layout.js
import React from 'react';
import './layout.scss';

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand text-danger" href="/">Airbnb</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item d-flex flex-row">
                <a className="nav-link" href="/">Home</a>
                <a className='nav-link' href="/login">Login</a>
                <a className='nav-link' href="/newListing">Create Listing</a>
                <a className='nav-link' href="/listings">My Listings</a>
                <a className='nav-link' href="/bookings">My Bookings</a>
                <a className='nav-link' href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="me-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;