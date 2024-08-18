import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProductBox.css';

const ProductBox = ({ products, addToCart }) => {
  const [cartStatus, setCartStatus] = useState({});

  const handleAddToCart = (product) => {
    if (!cartStatus[product.id]?.adding) {
      setCartStatus({
        ...cartStatus,
        [product.id]: { adding: true }
      });
      addToCart(product);

      setTimeout(() => {
        setCartStatus(prevStatus => ({
          ...prevStatus,
          [product.id]: { adding: false }
        }));
      }, 2000);
    }
  };

  return (
    <div className="product-box">
      {products.map(product => (
        <motion.div
          key={product.id}
          className="product-card"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>${product.price}</p>
          <div className="button-container">
            <Link to={`/product-detail/${product.id}`}>
              <motion.button
                className="button-style-view"
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </Link>
            <motion.button
              className="button-style-add"
              onClick={() => handleAddToCart(product)}
              whileTap={{ scale: 0.95 }}
              disabled={cartStatus[product.id]?.adding}
            >
              Add to Cart
            </motion.button>
            {cartStatus[product.id]?.adding && (
              <div className="added-to-cart-message">Added to Cart</div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductBox;
