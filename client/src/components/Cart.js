import CartItem from "./CartItem";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import styled from "styled-components";

// component to display cart page state/prop from app
const Cart = ({ noneFilteredItems }) => {
  // State to showing/hiding confirmation
  const [isPurchased, setIsPurchased] = useState(false);

  // const { userId, setCartItems, cartItems, calculateCartTotal, cartTotal, dispatch } = useContext(CartContext);
  const { userId, setCartItems, cartItems, cartTotal, dispatch } = useContext(CartContext);


  // Function that clears all the items from the orders collection when the cart is purchased.
  const clearCart = () => {
    fetch("/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  // Fetching all the items in the cart to render the cart items
  useEffect(() => {
    fetch(`/orders`)
      .then((res) => res.json())
      .then((data) => {
        // Setting the cart items to be used in the mapping of the cart items
        setCartItems(data.data);
        return data;
      })
      .then((data) => {
        // calculateCartTotal(data.data);
        dispatch({ type: "CALC_CART_TOTAL", cartTotal: data.data });
      })
      .catch((err) => console.log(err));
  }, [setCartItems, dispatch]);



  const handlePurchase = async () => {
    setIsPurchased(true);
    
    // TODO maybee display something to the customer when purchase succed 
    // e.preventDefault()
    const stripePurchase = await fetch("/purchase-items",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total : cartTotal })
      
      })
      console.log("TCL: stripePurchase", stripePurchase)
      //TODO maybee if res.status 200 setIsPurchased(true);

    
    }

  const handleCloseConfirmation = () => {
    window.location.reload();
  };

  return (
    <BodyWrapper>
      {!isPurchased ? (
        <Wrapper>
          <Title>Cart User {userId}</Title>
          {cartItems ? (
            // Mapping over the cart items to render each one/
            cartItems.map((item) => {
              return (
                <CartItem
                  key={item.productId}
                  item={item}
                  noneFilteredItems={noneFilteredItems}
                />
              );
            })
          ) : (
            <h2>Loading...</h2>
          )}
          <Total>
            <h2>Total: ${cartItems ? cartTotal : 0}</h2>
            {cartItems.length > 0 && (
              <PurchaseButton
                onClick={() => {
                  clearCart();
                  handlePurchase();
                }}
              >
                Purchase
              </PurchaseButton>
            )}
          </Total>
        </Wrapper>
      ) : (
        <Wrapper>
          <Confirmation>
            <ThankYou>Thank you for your purchase</ThankYou>
            <ThinLine />
            {cartItems && (
              <div>
                <Row>
                  <Name>Item</Name>
                  <h3>Qty</h3>
                  <h3>Price</h3>
                </Row>

                {cartItems.map((item) => {
                  return (
                    <Row key={item.name}>
                      <Name>{item.name}</Name>
                      <h3>{item.qty}</h3>
                      <h3>{item.price}</h3>
                    </Row>
                  );
                })}
                <ThinLine />
                <ConfirmationTotal>${cartTotal}</ConfirmationTotal>
              </div>
            )}
            <CloseConfirmationButton onClick={handleCloseConfirmation}>
              Close
            </CloseConfirmationButton>
          </Confirmation>
        </Wrapper>
      )}
    </BodyWrapper>
  );
};

export default Cart;

const BodyWrapper = styled.div`
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 90vw;
  margin-left: 5vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Confirmation = styled(Wrapper)`
  width: 80vw;
  background: white;
  height: max-content;
  margin-left: 5vw;
  margin-top: 5vh;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

const ThankYou = styled.h2`
  font-size: 27px;
  display: flex;
  justify-content: center;
`;

const ThinLine = styled.div`
  height: 1px;
  width: 100%;
  background: lightgray;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Name = styled.h3`
  width: 300px;
`;

const ConfirmationTotal = styled.h3`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const PurchaseButton = styled.button`
  margin-top: 15px;
  background: linear-gradient(to right, #023f05 0%, beige 50%, gold 100%);
  background-size: 500%;
  border: none;
  border-radius: 5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  color: white;
  cursor: pointer;
  font: 1.5em, sans-serif;
  height: 3rem;
  letter-spacing: 0.05em;
  width: 10rem;

  &:disabled {
    background-color: grey;
  }
  &:hover {
    cursor: pointer;
    background: #e4b34d;
    color: white;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const CloseConfirmationButton = styled(PurchaseButton)`
  margin-left: auto;
`;

const Title = styled.h1`
  margin: 20px 0 20px 20px;
  font-size: 30px;
`;
const Total = styled.div`
  margin-left: 70%;
  margin-bottom: 50px;
  align-items: center;
  justify-items: center;
  h2 {
    margin-left: 25px;
  }
`;
