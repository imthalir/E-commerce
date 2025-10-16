import React from 'react';
import { UilShop, UilUserCircle } from '@iconscout/react-unicons';

const Navbar = () => {
  return (
    <nav className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm bg-white flex-wrap">
      <div className="d-flex align-items-center gap-2">
        <UilShop style={{ width: '40px', height: '40px' }} color="orange" />
        <span className="fw-semibold fs-4 text-warning">Shoppy</span>
      </div>
      <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
        <UilUserCircle style={{ width: '30px', height: '30px' }} />
        <span className="fw-light fs-6 text-dark">Admin</span>
      </div>
    </nav>
  );
};

export default Navbar;

