import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import {AiOutlineDelete} from "react-icons/ai"
import { Link } from "react-router-dom";

// component to display the product item in the cart receiving states/props from the homepage, state set in the app
const CartItem = ({ item, noneFilteredItems }) => {
  // console.log("  ~ items", items)
  // console.log("  ~ item", item)
  // const { deleteFromCart, incrementQty, decrementQty, dispatch } = useContext(CartContext);
  const { dispatch } = useContext(CartContext);
  const [stock, setStock] = useState(null);

  // Getting each product for the cartItem
  useEffect(() => {
    fetch(`/product/${item.productId}`)
      .then((res) => res.json())
      .then((data) => setStock(data.data))
      .catch((err) => console.log(err));
  }, [item.productId]);

  return (
    <>
      {item && stock && (
        <Wrapper>
          <div className="cartItems">
          <ProductName>{item.name}</ProductName>
          {/* since item array doesnt contain the imgSrc i had to bring items array props and find the corresponding imageSrc from it */}
          {noneFilteredItems && noneFilteredItems.filter(({ name }) => item.name === name).map(({ imageSrc,_id }) => {

            return <Link key={_id} to={`/product/${_id}`}> <WatchImage src={imageSrc} alt="mini-WatchImages" /> </Link> 
          })
            

          }
          {/* remove the $ from price & convert multiply by qty & result limited to 2 decimals  */}
          <p>${(parseFloat(item.price.slice(1)) * item.qty).toFixed(2)}</p>
         
          <Counter>
            <DecrementButton
              disabled={item.qty <= 1}
              onClick={() =>
                //  decrementQty(item.productId)
                dispatch({
                  type: "DECREMENT_QTY",
                  decrementProductQty: item.productId,
                })
              }
            >
              -
            </DecrementButton>
            <p> {item.qty}</p>
            <IncrementButton
              disabled={stock.numInStock <= 0}
              onClick={() =>
                // incrementQty(item.productId)
                dispatch({
                  type: "INCREMENT_QTY",
                  incrementProductQty: item.productId,
                })
              }
            >
              +
            </IncrementButton>
            </Counter>
          <p>
            {" "}
            <DeleteButton
              onClick={() =>
                // deleteFromCart(item.productId)
                dispatch({
                  type: "DELETE_FROM_CART",
                  deleteProductInCart: item.productId,
                })
              }
            >
              <AiOutlineDelete size="20"/>
            </DeleteButton>
          </p>
          </div>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 90%;
 height: 10%;
 background-color: #ffffff;
 border-radius: 20px;
 // box-shadow: 0px 25px 40px #1687d933;  Fennie's original setting
 box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);


 .cartItems {
  margin: auto;
 width: 90%;
 height: 100%;
 // height: 30%; Fennie's original setting
 display: flex;
 justify-content: space-between;
 align-items: center;
}
`;
const WatchImage = styled.img`
/* transform: scale(0.35); */
width: 60px;
background-color: blue;
border-radius: 5px;
/* border: none;
outline:none; */

`;

const ProductName = styled.p`
  width: 50vw;
  font-weight: bold;
`;

const IncrementButton = styled.button`
  width: 40px;
 height: 40px;
 border-radius: 50%;
 background-color: #d9d9d9;
 display: flex;
 justify-content: center;
 align-items: center;
 font-size: 20px;
 font-weight: 900;
 color: #202020;
 cursor: pointer;

  &:disabled {
    background: lightgray;
  }

  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const DecrementButton = styled(IncrementButton)`
width: 40px;
 height: 40px;
 border-radius: 50%;
 background-color: #d9d9d9;
 display: flex;
 justify-content: center;
 align-items: center;
 font-size: 20px;
 font-weight: 900;
 color: #202020;
 cursor: pointer;

  &:disabled {
    background: lightgray;
  }

  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.9);
  }
`;


const DeleteButton = styled.button`

  color: red;
  background: transparent;
  border: 0;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
  &:active {
    transform: scale(1);
  }
`;

const Counter=styled.div`
width: 15%;
 display: flex;
 justify-content: space-between;
 align-items: center;`

export default CartItem;
