import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Items = (props) => {
  return (
    <div className="col-6 col-sm-4 col-md-3 mb-4">
      <div className="card h-100 border-0 shadow-sm text-center">
        <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
          <img src={props.image} alt={props.name} className="card-img-top img-fluid" style={{ width: '300px', height: '400px', objectFit: 'cover' }} />
        </Link>
        <div className="card-body">
          <p className="card-title fw-semibold mb-2">{props.name}</p>
          <div className="d-flex justify-content-center gap-3">
            <span className="text-dark fw-bold">₹{props.new_price}</span>
            <span className="text-muted text-decoration-line-through">₹{props.old_price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
