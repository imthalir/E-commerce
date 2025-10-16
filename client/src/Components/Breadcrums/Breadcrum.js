import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UilArrowRight } from '@iconscout/react-unicons';

const Breadcrum = ({ product }) => {
  return (
    <nav aria-label="breadcrumb" className="container my-5">
      <ol className="breadcrumb d-flex align-items-center flex-wrap gap-2 text-capitalize fw-semibold text-secondary">
        <li className="breadcrumb-item">HOME</li>
        <UilArrowRight />
        <li className="breadcrumb-item">SHOP</li>
        <UilArrowRight />
        <li className="breadcrumb-item">{product.category}</li>
        <UilArrowRight />
        <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
      </ol>
    </nav>
  );
};

export default Breadcrum;
