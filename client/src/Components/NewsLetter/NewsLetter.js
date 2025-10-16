import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewsLetter = () => {
  return (
    <div
      className="container my-5 py-5 d-flex flex-column align-items-center text-center"
      style={{
        backgroundImage: 'linear-gradient(180deg, #fde1ff 0%, #e1ffea22 60%)',
        borderRadius: '20px',
      }}
    >
      <h1 className="fw-bold text-dark mb-3">Get Exclusive Offers On Your Email</h1>
      <p className="text-secondary fs-5 mb-4">Subscribe to our newsletter and stay updated</p>

      <div className="input-group rounded-pill overflow-hidden" style={{ maxWidth: '730px', width: '100%', height: '50px' }}>
        <input
          type="email"
          className="form-control border-0 ps-4"
          placeholder="Your Email id"
          style={{ fontSize: '16px', color: '#616161' }}
        />
        <button className="btn btn-dark px-4" type="button">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
