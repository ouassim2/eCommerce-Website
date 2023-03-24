import { createContext, useState, useReducer } from "react";

export const CartContext = createContext(null);

// CartProvider provides logic (add, delete, increase items) for the cart and provides data for cart, cartItem, navbar, productCard, productDetails
export const CartProvider = ({ children }) => {
  // Setting the id for the current user to be used throughout the application
  const userId = 1234;
// create a state to store items in the cart
  const [cartItems, setCartItems] = useState([]);

  // Cart total
  // const [cartTotal, setCartTotal] = useState(0);
  // set cart total to 0
  const [cartTotal] = useState("0.00");

  // step 2: initial state
  const initialState = {
    userId: 1234,

    incrementProductQty: 0,
    decrementProductQty: 0,
    deleteProductInCart: 0,
  };

  // Calculate cart total
  const calculateCartTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseFloat(item.price.slice(1) * item.qty);
    });
    return total.toFixed(2);
  };

  // Functions
  // Add item to cart
  const addToCart = (item) => {
    const productId = item._id;
    const price = item.price;
    const qty = 1;
    const name = item.name;

    // Checking if order is already in the cart
    let itemExists = false;
    // Getting all the orders already in the cart
    fetch("/orders")
      .then((res) => res.json())
      .then((data) => {
        if (
          data.data.some((item) => {
            return item.productId === productId;
          })
        ) {
          // If the item exists in cart, alert to user and don't add to cart again
          itemExists = true;
          window.alert("Item is already in the cart");
        }
      })
      .then(() => {
        // If item doesn't exists in cart, add to cart.
        if (!itemExists) {
          fetch("/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId,
              userId,
              price,
              qty,
              name,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setCartItems([...cartItems, data.data]);
              // Reloading the window in order to force a fetch and show the item now in cart
              window.location.reload();
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  // Delete item from the cart
  const deleteFromCart = (productId) => {
    fetch("/order", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // Reloading the window in order to force a fetch and show the item no longer in cart
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Increment the qty of an item in the cart
  const incrementQty = (productId) => {
    // Finding the current quantity
    const item = cartItems.filter((item) => {
      return item.productId === productId;
    });
    const itemQuantity = item[0].qty;
    const newQty = itemQuantity + 1;

    fetch(`/order/${productId}')`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // incrementing in the cart means
        qty: newQty,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // Reloading the window in order to force a fetch and show the new qty
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Decrement the qty of an item in the cart
  const decrementQty = (productId) => {
    // Finding the current quantity
    const item = cartItems.filter((item) => {
      return item.productId === productId;
    });
    const itemQuantity = item[0].qty;
    const newQty = itemQuantity - 1;

    fetch(`/order/${productId}')`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // incrementing in the cart means
        qty: newQty,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // Reloading the window in order to force a fetch and show the new qty
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // step 3: reducer

  const reducer = (state, action) => {
    // console.log("  ~ action", action)

    switch (action.type) {
      // case "ADD_TO_CART":
      //   return {
      //     ...state,
      //     cartItems : addToCart(action.cartItems)
      //   }

      case "INCREMENT_QTY":
        return {
          ...state,
          incrementProductQty: incrementQty(action.incrementProductQty),
        };
      case "DECREMENT_QTY":
        return {
          ...state,
          decrementProductQty: decrementQty(action.decrementProductQty),
        };
      case "DELETE_FROM_CART":
        return {
          ...state,
          deleteProductInCart: deleteFromCart(action.deleteProductInCart),
        };
      case "CALC_CART_TOTAL":
        return {
          ...state,
          cartTotal: calculateCartTotal(action.cartTotal),
        };

      default:
        // throw new Error (`Unrecognized action: ${action.type}`);
        return state;
    }
  };

  // step 4 : create the reducer state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider
      value={{
        userId,
        cartItems,
        setCartItems,
        addToCart,
        deleteFromCart,
        incrementQty,
        decrementQty,
        calculateCartTotal,
        cartTotal,
        ...state,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
