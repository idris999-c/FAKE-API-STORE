import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams(); // URL parametresinden ID'yi al
  const [isAdded, setIsAdded] = useState(false); // Geri bildirim mesajı durumu
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Butonun aktif olup olmadığını kontrol et

  // Eğer products prop'u tanımlı değilse, bileşeni döndür
  if (!products) {
    return <p>Loading...</p>;
  }

  // Ürünleri bul
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    if (!isButtonDisabled) {
      setIsAdded(true);
      addToCart(product);

      // Geri bildirim mesajını göstermek ve ardından gizlemek için
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsAdded(false);
        setIsButtonDisabled(false);
      }, 2000); // 2 saniye boyunca geri bildirim gösterecek
    }
  };

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <div className="button-container">
        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={isButtonDisabled} // Butonu devre dışı bırak
        >
          Add to Cart
        </button>
        {isAdded && (
          <div className="added-to-cart-message">Added to Cart</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
