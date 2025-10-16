import React, { useContext } from 'react';
import { UilStar } from '@iconscout/react-unicons';
import { ShopContext } from '../../Context/ShopContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Left Section */}
        <div className="col-12 col-md-6">
          <div className="d-flex flex-column flex-md-row gap-3">
            {/* Thumbnails */}
            <div className="d-flex flex-row flex-md-column gap-3 justify-content-center">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src={product.image}
                  alt=""
                  className="img-fluid rounded"
                  style={{ maxHeight: '120px', objectFit: 'cover' }}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="text-center text-md-start flex-grow-1">
              <img
                src={product.image}
                alt=""
                className="img-fluid rounded"
                style={{ maxHeight: '500px', width: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-12 col-md-6">
          <h2 className="fw-bold text-dark">{product.name}</h2>

          <div className="d-flex align-items-center gap-2 mt-2 text-secondary">
            {[...Array(5)].map((_, i) => (
              <UilStar key={i} color="gold"/>
            ))}
            <p className="mb-0 small">(122)</p>
          </div>

          <div className="d-flex gap-4 mt-3 fs-5 fw-bold">
            <span className="text-muted text-decoration-line-through">₹{product.old_price}</span>
            <span className="text-danger">₹{product.new_price}</span>
          </div>

          <p className="mt-3 text-secondary small">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem illo, velit natus consectetur impedit quaerat suscipit molestias quo.
          </p>

          <div className="mt-4">
            <h6 className="text-muted fw-semibold">Select Size</h6>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div
                  key={size}
                  className="px-3 py-2 border rounded bg-light text-dark fw-medium"
                  style={{ cursor: 'pointer' }}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(product.id)}
            className="btn btn-danger px-4 py-2 mt-4 fw-semibold w-100 w-md-auto"
          >
            ADD TO CART
          </button>

          <p className="mt-3 text-secondary small">
            <span className="fw-semibold">Category:</span> T-Shirt, Pant
          </p>
          <p className="text-secondary small">
            <span className="fw-semibold">Tags:</span> Modern, Latest
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
