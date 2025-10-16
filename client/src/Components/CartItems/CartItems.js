import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { UilX } from '@iconscout/react-unicons';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className="container my-5">
      {/* Responsive Table */}
      <div className="table-responsive">
        <table className="table align-middle text-center">
          <thead className="table-light">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {all_product.map((e) => {
              if (cartItems[e.id] > 0) {
                return (
                  <tr key={e.id}>
                    <td>
                      <img
                        src={e.image}
                        alt={e.name}
                        className="img-fluid"
                        style={{ maxHeight: '80px' }}
                      />
                    </td>
                    <td>{e.name}</td>
                    <td>₹{e.new_price}</td>
                    <td>
                      <button className="btn btn-outline-secondary">{cartItems[e.id]}</button>
                    </td>
                    <td>₹{e.new_price * cartItems[e.id]}</td>
                    <td>
                      <UilX
                        className="text-danger"
                        style={{ cursor: 'pointer' }}
                        onClick={() => removeFromCart(e.id)}
                      />
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      {/* Cart Totals & Promo Code */}
      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <h4>Cart Totals</h4>
          <div className="d-flex justify-content-between py-2">
            <span>Subtotal</span>
            <span>₹{getTotalCartAmount()}</span>
          </div>
          <div className="d-flex justify-content-between py-2">
            <span>Shipping Fee</span>
            <span>Free</span>
          </div>
          <div className="d-flex justify-content-between py-2 border-top pt-2">
            <strong>Total</strong>
            <strong>₹{getTotalCartAmount()}</strong>
          </div>
          <button className="btn btn-danger w-100 mt-3">PROCEED TO CHECKOUT</button>
        </div>

        <div className="col-md-6">
          <p>If you have a promo code, enter it here:</p>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Promo code" />
            <button className="btn btn-dark">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
