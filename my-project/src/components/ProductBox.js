import React from 'react';
import { Link } from 'react-router-dom';
import './ProductBox.css'; // CSS dosyasını import edin

const ProductBox = ({ products, addToCart }) => {
  return (
    <div className="product-box">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>${product.price}</p>
          <Link to={`/product-detail/${product.id}`}>
            <button className="button-style">View Details</button>
          </Link>
          <button className="button-style" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductBox;
