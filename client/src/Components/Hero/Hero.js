import React from 'react';
import banner1 from '../Assets/banner1.png';
import { UilArrowRight } from '@iconscout/react-unicons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Hero = () => {
  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundImage: 'linear-gradient(180deg, #fde1ff, #e1ffea22 60%)',
      }}
    >
      <div className="row align-items-center">
        {/* Left Section */}
        <div className="col-md-6 text-center text-md-start px-4">
          <h2 className="fw-semibold text-dark">NEW ARRIVALS ONLY</h2>
          <div>
            <p className="fs-1 fw-bold text-dark mb-0">new👋</p>
            <p className="fs-1 fw-bold text-dark mb-0">Collections</p>
            <p className="fs-1 fw-bold text-dark mb-0">for everyone</p>
          </div>
          <div className="btn btn-danger d-inline-flex align-items-center gap-2 rounded-pill px-4 py-3 mt-3 fs-5 fw-medium">
            Latest Collection <UilArrowRight />
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6 text-center mt-4 mt-md-0 px-4">
          <img src={banner1} alt="Hero Banner" className="img-fluid w-100"  style={{ maxWidth: '65%' }}/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
