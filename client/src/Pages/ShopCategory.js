import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { UilArrowDown } from '@iconscout/react-unicons';
import Items from '../Components/Item/Items';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="container my-5">
      {/* Banner */}
      <img src={props.banner} alt="Category Banner" className="img-fluid mb-4 rounded" />

      {/* Index & Sort */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <p className="mb-2 mb-md-0">
          <span className="fw-semibold">Showing 1–12</span> out of 30 products
        </p>
        <div className="border rounded-pill px-3 py-2 d-flex align-items-center gap-2 text-secondary">
          Sort by <UilArrowDown />
        </div>
      </div>

      {/* Products Grid */}
      <div className="row g-4">
        {all_product.map((item, i) =>
          props.category === item.category ? (
            <Items
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ) : null
        )}
      </div>

      {/* Load More */}
      <div className="d-flex justify-content-center mt-5">
        <div className="btn btn-light rounded-pill px-5 py-3 text-secondary fw-medium">
          Explore More
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
