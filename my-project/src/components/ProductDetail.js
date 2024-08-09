import React from 'react';
import { useParams } from 'react-router-dom'; // useParams import edildi
import './ProductDetail.css'; // CSS dosyanızı import edin

const ProductDetail = ({ products, addToCart }) => {
  // ID'yi URL'den al
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button
        className="add-to-cart-button" // CSS sınıfını doğru kullanın
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
