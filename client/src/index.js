import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

import { CartProvider } from "./components/CartContext";
// cartprovider to share prop data throughout
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);
