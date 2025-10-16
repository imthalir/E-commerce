import React from 'react';
import banner2 from '../Assets/banner2.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Offers = () => {
  return (
    <div
      className="container my-5 py-5"
      style={{
        backgroundImage: 'linear-gradient(180deg, #fde1ff 0%, #e1ffea22 60%)',
        borderRadius: '20px',
      }}
    >
      <div className="row align-items-center">
        {/* Left Section */}
        <div className="col-md-6 text-center text-md-start">
          <h1 className="fw-bold text-dark display-4">Exclusive</h1>
          <h1 className="fw-bold text-dark display-4">Offers for you</h1>
          <p className="fs-5 fw-semibold text-dark mt-3">ONLY ON BEST SELLERS PRODUCTS</p>
          <button className="btn btn-danger rounded-pill px-4 py-3 mt-4 fs-5 fw-medium">Check Now</button>
        </div>

        {/* Right Section */}
        <div className="col-md-6 text-center mt-4 mt-md-0">
          <img src={banner2} alt="Offer Banner" className="img-fluid" style={{ maxWidth: '55%' }} />
        </div>
      </div>
    </div>
  );
};

export default Offers;
