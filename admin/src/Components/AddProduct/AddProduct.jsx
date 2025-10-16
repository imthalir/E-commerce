import React, { useState } from 'react';
import axios from 'axios';
import upload_area from '../../assets/upload-area.jpg';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: '',
    new_price: '',
    old_price: ''
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    try {
      const formData = new FormData();
      formData.append('product', image);

      const uploadRes = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });

      if (uploadRes.data.success) {
        const product = { ...productDetails, image: uploadRes.data.image_url };
        console.log(product);

        const addRes = await axios.post('http://localhost:5000/addproduct', product, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        addRes.data.success ? alert('Product Added') : alert('Failed');
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="container bg-white p-4 my-4 rounded shadow-sm">
      <div className="mb-3">
        <label className="form-label">Product title</label>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          className="form-control"
          placeholder="Type here"
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            className="form-control"
            placeholder="Type here"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Offer Price</label>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            className="form-control"
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Product category</label>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="form-select w-auto"
        >
          <option value="" disabled>Select</option>
          <option value="mens">Mens</option>
          <option value="womens">Womens</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="file-input" className="form-label d-block">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="Upload preview"
            className="img-thumbnail"
            style={{ height: '120px', width: '120px', objectFit: 'contain' }}
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button onClick={Add_Product} className="btn btn-primary px-4 py-2">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
