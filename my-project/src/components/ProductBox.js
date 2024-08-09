// components/ProductBox.js
import React from 'react';
import './ProductBox.css'; // CSS dosyanız varsa

const ProductBox = ({ products, addToCart }) => {
  return (
    <div className="container">
      {products.map(product => (
        <div key={product.id} className="box">
          <img src={product.image} alt={product.title} className="product-image" />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price}</p>
          <button className="view-details-button">View Details</button>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductBox;
