import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams(); // URL parametresinden ID'yi al
  
  // Eğer products prop'u tanımlı değilse, bileşeni döndür
  if (!products) {
    return <p>Loading...</p>;
  }

  // Ürünleri bul
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button
        className="add-to-cart-button"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
