import React, { useState } from "react";

import Cart from "components/Cart";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import CartItemsContext from "./contexts/CartItemsContext";
import Checkout from "./components/Checkout";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartItemsContext.Provider value={[cartItems, setCartItems]}>
      <Switch>
        <Route exact component={Cart} path={routes.cart} />
        <Route exact component={Checkout} path={routes.checkout} />
        <Route exact component={Product} path={routes.products.show} />
        <Route exact component={ProductList} path={routes.products.index} />
        <Redirect exact from={routes.root} to={routes.products.index} />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </CartItemsContext.Provider>
  );
};

export default App;
