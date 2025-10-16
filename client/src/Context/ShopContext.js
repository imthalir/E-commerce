// import React, { createContext, useEffect, useState } from 'react';
// import axios from 'axios';

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index <= 300; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };

// const ShopContextProvider = (props) => {
//   const [all_product, setAll_Product] = useState([]);
//   const [cartItems, setCartItems] = useState(getDefaultCart());

//   useEffect(() => {
//     const fetchProductsAndCart = async () => {
//       try {
//         const productRes = await axios.get('http://localhost:5000/allproducts');
//         setAll_Product(productRes.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }

//       const token = localStorage.getItem('auth-token');
//       if (token) {
//         try {
//           const cartRes = await axios.post(
//             'http://localhost:5000/getcart',
//             {},
//             {
//               headers: {
//                 Accept: 'application/json',
//                 'auth-token': token,
//                 'Content-Type': 'application/json'
//               }
//             }
//           );
//           setCartItems(cartRes.data);
//         } catch (error) {
//           console.error('Error fetching cart:', error);
//         }
//       }
//     };

//     fetchProductsAndCart();
//   }, []);

//   const addToCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

//     const token = localStorage.getItem('auth-token');
//     if (token) {
//       try {
//         const res = await axios.post(
//           'http://localhost:5000/addtocart',
//           { itemId },
//           {
//             headers: {
//               Accept: 'application/json',
//               'auth-token': token,
//               'Content-Type': 'application/json'
//             }
//           }
//         );
//         console.log(res.data);
//       } catch (error) {
//         console.error('Error adding to cart:', error);
//       }
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

//     const token = localStorage.getItem('auth-token');
//     if (token) {
//       try {
//         const res = await axios.post(
//           'http://localhost:5000/removefromcart',
//           { itemId },
//           {
//             headers: {
//               Accept: 'application/json',
//               'auth-token': token,
//               'Content-Type': 'application/json'
//             }
//           }
//         );
//         console.log(res.data);
//       } catch (error) {
//         console.error('Error removing from cart:', error);
//       }
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         const itemInfo = all_product.find((product) => product.id === Number(item));
//         if (itemInfo) {
//           totalAmount += itemInfo.new_price * cartItems[item];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const getTotalCartItems = () => {
//     let totalItem = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         totalItem += cartItems[item];
//       }
//     }
//     return totalItem;
//   };

//   const contextValue = {
//     getTotalCartItems,
//     getTotalCartAmount,
//     all_product,
//     cartItems,
//     addToCart,
//     removeFromCart
//   };

//   return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
// };

// export default ShopContextProvider;






import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

// Base URL for all requests
const BASE_URL = 'http://localhost:5000';

// Default cart initializer
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

// Auth header generator
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth-token');
  return token
    ? {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token
      }
    : {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Fetch products and cart on mount
  useEffect(() => {
    const fetchProductsAndCart = async () => {
      try {
        const productRes = await axios.get(`${BASE_URL}/allproducts`);
        setAll_Product(productRes.data);
      } catch (err) {
        console.error('Error fetching products:', err.message);
      }

      try {
        const cartRes = await axios.post(`${BASE_URL}/getcart`, {}, {
          headers: getAuthHeaders()
        });
        setCartItems((prev) => ({
          ...getDefaultCart(),
          ...prev,
          ...cartRes.data
        }));
      } catch (err) {
        console.error('Error fetching cart:', err.message);
      }
    };

    fetchProductsAndCart();
  }, []);

  // Add to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    try {
      const res = await axios.post(`${BASE_URL}/addtocart`, { itemId }, {
        headers: getAuthHeaders()
      });
      console.log(res.data);
    } catch (err) {
      console.error('Error adding to cart:', err.message);
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    try {
      const res = await axios.post(`${BASE_URL}/removefromcart`, { itemId }, {
        headers: getAuthHeaders()
      });
      console.log(res.data);
    } catch (err) {
      console.error('Error removing from cart:', err.message);
    }
  };

  // Total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Total cart items
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
