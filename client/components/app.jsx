import React from 'react';
import AppContext from '../lib/context';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    const init = {
      method: 'GET'
    };
    fetch('/api/cart', init)
      .then(response => response.json())
      .then(cartData => {
        this.setState(state => ({ cart: cartData }));
      });
  }

  addToCart(productId) {
    const reqBody = { productId };
    const init = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-type': 'application/json' }
    };
    fetch('api/cart', init)
      .then(response => response.json())
      .then(data => {
        const cartCopy = [...this.state.cart];
        cartCopy.push(data);
        this.setState(state => ({ cart: cartCopy }));
      });
  }

  placeOrder(information) {
    const init = {
      method: 'POST',
      body: JSON.stringify(information),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('api/orders', init)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          this.setState(state => ({ view: { name: 'catalog', params: {} }, cart: [] }));
        }
      });
  }

  render() {

    const context = {
      cart: this.state.cart,
      addToCart: this.addToCart,
      placeOrder: this.placeOrder
    };
    return (
      <AppContext.Provider value={context}>
        <div className="donuts-sales-container">
          <Router>
            <Route exact path="/" component={ProductList} />
            <Route path="/product-detail/:productid" component={ProductDetails} />
            <Route exact path="/cart" component={CartSummary} />
            <Route exact path="/checkout" component={CheckoutForm} />
          </Router>
        </div>
      </AppContext.Provider>
    );
  }

}
