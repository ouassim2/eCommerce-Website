import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import LoadingSpinner from "./LoadingSpinner";

// displays details of each item when clicked on from homepage
const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, userId } = useContext(CartContext);
  const navigate = useNavigate();

  const [item, setItem] = useState();
  useEffect(() => {
    fetch(`/product/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Div>
      {item ? (
        <Wrapper>
          <div>
            <img src={item.imageSrc} alt={item.name} />
          </div>
          <ItemInfo>
            <h3>Item name:{item.name}</h3>
            <p>
              <strong>Price: </strong>
              {item.price}
            </p>
            <p>
              <strong>In Stock: </strong>
              {item.numInStock}
            </p>
            <p>
              <strong>Category: </strong>
              {item.category}
            </p>
            <p>
              <strong>ID: </strong>
              {item._id}
            </p>
            <p>
              <strong>Body Location: </strong>
              {item.body_location}
            </p>
            <StyledButton
              // disable button if no inventory
              disabled={item.numInStock === 0}
              // onclick add item to cart
              onClick={async () => {
                await addToCart(item);

                // await dispatch({ type: "ADD_TO_CART", cartItems: item });
                // go to cart with of the current user
                navigate(`/cart/${userId}`);
              }}
            >
              {/* toggle inventory to prevent users from buying out of stock items */}
              {item.numInStock === 0 ? "Out of Stock" : "Add to Cart"}
            </StyledButton>
          </ItemInfo>
        </Wrapper>
      ) : (
        <Loading>
          <LoadingSpinner />
        </Loading>
      )}
    </Div>
  );
};

const Div = styled.div`
  height: 100vh;
  /* font-family: Arial, Helvetica, sans-serif; */
  background: #f0ead6;
  display: flex;
  justify-content: center;
  align-items: center;
  
  h1 {
    color: #242929;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 25px;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20vh;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 500px 500px;
  justify-content: center;
  align-items: center;

  img {
    height: 375px;
    width: 375px;
    object-fit: contain;
    border-radius: 8px;
    margin-bottom: 20px;
    margin-top: 50px;
    /* box-shadow: 0 0 8px 8px white inset; */
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }

  h3 {
    font-size: 25px;
    padding-bottom: 10px;
    color: #303636;
  }
  p {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 20px;
    color: #485151;
  }
`;
const StyledButton = styled.button`
  margin-top: 15px;
  background: linear-gradient(to right, #023f05 0%, beige 50%, gold 100%);
  background-size: 500%;
  border: none;
  border-radius: 5rem;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  color: white;
  cursor: pointer;
  font: 1.5em , sans-serif;
  height: 3rem;
  letter-spacing: .05em;
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

const ItemInfo=styled.div`
width: 300px;
`


  
export default ProductDetails;
