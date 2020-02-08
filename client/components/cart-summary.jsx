import React from 'react';
import AppContext from '../lib/context';
import { Link } from 'react-router-dom';
import Title from './title';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null
    };
  }

  render() {
    const cartItems = this.context.cart;
    let total = 0;
    cartItems.forEach(item => { total += item.price; });
    const display = cartItems.map(item => (<CartSummaryItem key={item.cartItemId} cartItem={item}/>));
    const itemTotalCheckOut = cartItems.length ? (<div className="checkout-container row">
      <p className="total-price font-weight-bold col-9 brush">
        Item Total: {`$${(total / 100).toFixed(2)}`}
      </p>
      <div className="checkout-button-container col-3">
        <Link to={'/checkout'}>
          <button type="button" className="check-out-button hvr-pulse">
            Check Out
          </button>
        </Link>
      </div>
    </div>) : <p className="cart-description">Nothing in the cart. Please fill me up!!</p>;
    return (
      <React.Fragment>
        <Title />
        <div className="cart-container">
          <div className="cart-title">
            <p className="back-to-catalog" onClick={() => { this.props.history.push('/'); }}>{'< Back to Catalog'}</p>
            <p className="brush">My Cart</p>
          </div>
          {display}
          {itemTotalCheckOut}
        </div>
      </React.Fragment>
    );
  }
}

export default CartSummary;
CartSummary.contextType = AppContext;