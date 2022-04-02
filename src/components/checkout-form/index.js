import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { DishContext } from "../../context/dishes";
import { CartContext } from "../../context/cart";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import './checkout-form.css';


const CARD_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};


const CheckoutForm = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { checkout } = useContext(DishContext);
  const [orderDetails, setOrderDetails] = useState({ cart, total, address: null, token: null });
  const [fail, setFailure] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  useEffect(() => {
    if (orderDetails.token) {
      checkout(orderDetails);
      clearCart();
      history.push("/");
    }
  }, [checkout, clearCart, history, orderDetails]);

  
  const handleChange = (e) => {
    if (e.error) {
      setFailure(e.error.message);
    } else {
      setFailure(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      setFailure(result.error.message);
    } else {
      setFailure(null);
      const token = result.token;
      setOrderDetails({ ...orderDetails, token: token.id });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="checkout-form">
        <label for="address">Shipping Address</label>
        <input
          id="address"
          type="text"
          onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
        />
        <div className="stripe-section">
          <label htmlFor="stripe-element"> Credit or debit card </label>
          <CardElement id="stripe-element" options={CARD_OPTIONS} onChange={handleChange} />
        </div>
        <div className="card-errors" role="alert">
          {fail}
        </div>
      </div>
      <button type="submit" className="btn">
        Submit Payment
      </button>
    </form>
  );
};

export default CheckoutForm;
