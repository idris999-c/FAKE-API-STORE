import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Framer Motion'u import edin
import './ProductBox.css'; // CSS dosyasını import edin

const ProductBox = ({ products, addToCart }) => {
  const [cartStatus, setCartStatus] = useState({}); // Her ürün için durum yönetimi

  const handleAddToCart = (product) => {
    if (!cartStatus[product.id]?.adding) {
      setCartStatus({
        ...cartStatus,
        [product.id]: { adding: true }
      });
      addToCart(product);

      // Geri bildirim mesajını göstermek ve ardından gizlemek için
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
          <Link to={`/product-detail/${product.id}`}>
            <motion.button
              className="button-style"
              whileTap={{ scale: 0.95 }} // Tıklama animasyonu
            >
              View Details
            </motion.button>
          </Link>
          <motion.div className="button-container">
            <motion.button
              className="button-style"
              onClick={() => handleAddToCart(product)}
              whileTap={{ scale: 0.95 }} // Tıklama animasyonu
              disabled={cartStatus[product.id]?.adding} // Butonun tekrar tıklanmasını engelle
            >
              Add to Cart
            </motion.button>
            {cartStatus[product.id]?.adding && (
              <div className="added-to-cart-message">Added to Cart</div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductBox;
