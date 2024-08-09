import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook'u ile yönlendirme

const Shopping = ({ cart }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // useNavigate hook'u

  // Sayfa yüklendiğinde veya cart değiştiğinde güncelle
  useEffect(() => {
    const uniqueItems = cart.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
    setCartItems(uniqueItems);
  }, [cart]);

  // Miktarı artır
  const increaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
  };

  // Miktarı azalt
  const decreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
    }
  };

  // Ürünü sepetten kaldır
  const removeItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  // Toplam fiyat hesaplama
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Continue butonuna tıklandığında Success sayfasına yönlendir
  const handleContinue = () => {
    navigate('/success');
  };

  return (
    <div className="shopping-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={item.id} className="cart-item">
            <div className="remove-button-container">
              <button className="remove-button" onClick={() => removeItem(index)}>×</button>
            </div>
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h2>{item.title}</h2>
              <p>Price: ${item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(index)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(index)}>+</button>
              </div>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="total-price">
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        <button className="continue-button" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
};

export default Shopping;
