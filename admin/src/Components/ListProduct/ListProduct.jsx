import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UilX } from '@iconscout/react-unicons';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await axios.get('http://localhost:5000/allproducts');
      setAllProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      await axios.post('http://localhost:5000/removeproduct', { id }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      await fetchInfo();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className="container bg-white p-4 my-4 rounded shadow-sm">
      <h2 className="mb-4 text-center">All Products List</h2>

      <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Title</th>
              <th scope="col">Old Price</th>
              <th scope="col">New Price</th>
              <th scope="col">Category</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {allproducts.map((product, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={product.image}
                    alt="product"
                    className="img-fluid"
                    style={{ height: '80px', objectFit: 'contain' }}
                  />
                </td>
                <td>{product.name}</td>
                <td>₹{product.old_price}</td>
                <td>₹{product.new_price}</td>
                <td>{product.category}</td>
                <td>
                  <UilX
                    onClick={() => remove_product(product.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
