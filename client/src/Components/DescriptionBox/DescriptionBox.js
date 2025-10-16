import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DescriptionBox = () => {
  return (
    <div className="container my-5">
      <div className="d-flex flex-wrap border mb-3">
        <div className="flex-fill text-center py-3 border-end fw-semibold">Description</div>
        <div className="flex-fill text-center py-3 text-secondary bg-light fw-semibold">Reviews (122)</div>
      </div>
      <div className="border p-4 pb-5">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nam, harum voluptatum ea maiores voluptate,
          nemo libero sapiente optio molestias deserunt illo quisquam similique. Nam sit iusto inventore aut assumenda
          maxime ut labore, magni dicta cum dolorem adipisci provident doloribus consectetur quo quae blanditiis id fugit?
          Error dignissimos exercitationem officiis.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
