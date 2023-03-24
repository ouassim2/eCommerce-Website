import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CartProvider } from "./components/CartContext";
// cartprovider to share prop data throughout
ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
