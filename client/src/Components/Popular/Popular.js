import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Items from '../Item/Items';
import 'bootstrap/dist/css/bootstrap.min.css';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/popular');
        setPopularProducts(res.data);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="container text-center my-5">
      <h1 className="fw-bold text-dark mb-3">POPULAR IN COLLECTIONS</h1>
      <hr
        className="mx-auto mb-5"
        style={{
          width: '200px',
          height: '6px',
          backgroundColor: '#252525',
          borderRadius: '10px',
          border: 'none'
        }}
      />

      <div className="row g-4">
        {popularProducts.map((item, i) => (
          <Items
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
