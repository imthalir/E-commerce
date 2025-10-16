import React from 'react';
import { Link } from 'react-router-dom';
import { UilShoppingCart, UilListOl } from '@iconscout/react-unicons';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column p-4 gap-3 bg-white" style={{ maxWidth: '260px', height: '100vh' }}>
      <Link to="/addproduct" className="text-decoration-none">
        <div className="d-flex align-items-center px-3 py-2 rounded" style={{ backgroundColor: '#f6f6f6', gap: '20px', color: 'black', cursor: 'pointer' }}>
          <UilShoppingCart />
          <span>Add Product</span>
        </div>
      </Link>
      <Link to="/listproduct" className="text-decoration-none">
        <div className="d-flex align-items-center px-3 py-2 rounded" style={{ backgroundColor: '#f6f6f6', gap: '20px', color: 'black', cursor: 'pointer' }}>
          <UilListOl />
          <span>List Product</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
