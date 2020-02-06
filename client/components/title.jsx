import React from 'react';

function Title(props) {
  return (
    <div className="title p-3">
      <div className="store-name glow">W Bakery</div>
      <div className="shopping-cart" onClick={() => { props.setView('cart', {}); }}>
        <img src="https://img.icons8.com/dusk/64/000000/food-cart.png" />
        <p className="cart-amount">{props.cartNum}</p>
      </div>
    </div>
  );
}

export default Title;
