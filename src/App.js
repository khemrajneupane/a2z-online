import React from "react";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/home-page";
import Admin from "./pages/admin-page";
import Header from "./components/header";
import awsExports from "./aws-exports";
import DishDetails from "./pages/dish-details";
import AllDishes from "./pages/all-dishes";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Login from "./components/login";

Amplify.configure(awsExports);

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>        
        <Route path="/login">
          <Login />
        </Route>        
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/dishes/:id">
          <DishDetails />
        </Route>
        <Route path="/dishes">
          <AllDishes />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
