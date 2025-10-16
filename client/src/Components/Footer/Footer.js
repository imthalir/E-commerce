import React from 'react';
import { UilShop, UilInstagram, UilFacebook, UilWhatsapp } from '@iconscout/react-unicons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-light py-5 mt-5">
      <div className="container text-center">
        {/* Logo */}
        <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
          <UilShop size="50" color="orange"/>
          <span className="fs-1 fw-bold text-warning">Shoppy</span>
        </div>

        {/* Links */}
        <ul className="list-inline mb-4">
          {['Company', 'Products', 'Offices', 'About', 'Contact'].map((item, index) => (
            <li key={index} className="list-inline-item mx-3 fs-5 text-secondary" style={{ cursor: 'pointer' }}>
              {item}
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          {[UilInstagram, UilFacebook, UilWhatsapp].map((Icon, index) => (
            <div key={index} className="p-2 border rounded bg-white">
              <Icon size="24" />
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-muted">
          <hr className="mx-auto" style={{ width: '80%', height: '3px', backgroundColor: '#c7c7c7', border: 'none', borderRadius: '10px' }} />
          <p className="mt-3 fs-5">© Thalir 2025 – All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
