import React, { useContext, useState } from 'react';
import { UilShop, UilBars, UilShoppingCart } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';


const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-md bg-white shadow-sm px-4 py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <UilShop size="40" color="orange"/>
            <span className="fs-2 fw-semibold text-warning">Shoppy</span>
          </Link>

          <div className='d-md-none'>
          {/* Cart Icon */}
          <Link to="/cart" className="position-relative text-decoration-none d-md-none ml-1">
            <UilShoppingCart size="30" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {getTotalCartItems()}
            </span>
          </Link>

          {/* Toggle Button */}
          <button
            className="btn d-md-none ml-1"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
          >
            <UilBars size="30" color="green"/>
          </button>
          </div>

          {/* Desktop Menu */}
          <ul className="navbar-nav d-none d-md-flex flex-row gap-4 text-secondary fw-medium">
            {['shop', 'mens', 'womens', 'kids'].map((item) => (
              <li key={item} className="nav-item text-center">
                <Link
                  to={`/${item === 'shop' ? '' : item}`}
                  className="nav-link"
                  onClick={() => setMenu(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
                {menu === item && (
                  <hr
                    className="mx-auto"
                    style={{
                      width: '80%',
                      height: '3px',
                      backgroundColor: 'green',
                      borderRadius: '10px',
                      border: 'none',
                    }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Login & Cart */}
          <div className="d-none d-md-flex align-items-center gap-4">
            {localStorage.getItem('auth-token')
            ? <button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}} className="btn btn-outline-success rounded-pill px-4">Logout</button>
            :
            <Link to="/login">
              <button className="btn btn-outline-success rounded-pill px-4">Login</button>
            </Link>}
            <Link to="/cart" className="position-relative text-decoration-none">
              <UilShoppingCart size="40" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalCartItems()}
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Offcanvas Menu for Mobile */}
      <div
        className="offcanvas offcanvas-end text-bg-light border-start shadow-lg"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileMenuLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-3">
          {['shop', 'mens', 'womens', 'kids'].map((item) => (
          <Link
            key={item}
            to={`/${item === 'shop' ? '' : item}`}
            className="text-decoration-none text-dark fw-medium"
            onClick={() => {
              setMenu(item);
              const offcanvasEl = document.getElementById('mobileMenu');
              const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
              if (bsOffcanvas) {
                bsOffcanvas.hide();

                // Manually remove lingering backdrop if it exists
                setTimeout(() => {
                  const backdrop = document.querySelector('.offcanvas-backdrop');
                  if (backdrop) {
                    backdrop.remove();
                    document.body.classList.remove('offcanvas-backdrop');
                    document.body.classList.remove('modal-open'); // just in case
                  }
                }, 300); // delay to allow Bootstrap animation to complete
              }
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
          ))}
          <Link
            to="/login"
            className="mt-3"
            onClick={() => {
              const offcanvasEl = document.getElementById('mobileMenu');
              const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
              if (bsOffcanvas) {
                bsOffcanvas.hide();
                setTimeout(() => {
                  const backdrop = document.querySelector('.offcanvas-backdrop');
                  if (backdrop) {
                    backdrop.remove();
                    document.body.classList.remove('offcanvas-backdrop');
                    document.body.classList.remove('modal-open');
                  }
                }, 300);
              }
            }}
          >
            <button className="btn btn-outline-success w-100">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
