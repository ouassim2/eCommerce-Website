import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

// create each item's display for homepage. The item state is passed from app via homepage
const ProductCard = ({ item }) => {
  const { addToCart, userId } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Card>
      <Link to={`/product/${item._id}`}>
        <ProductImage src={item.imageSrc} alt={item.name} />
      </Link>
      <ProductName>{item.name}</ProductName>
      <StyledBox>
        <ProductPrice>
          <strong>Price:</strong>
          {item.price}
        </ProductPrice>
        <AddToCart
          // disable button if no inventory
          disabled={item.numInStock === 0}
          // onclick add item to cart
          onClick={async () => {
            // console.log(item);
            await addToCart(item, userId);

            // await dispatch({ type: "ADD_TO_CART", cartItems: item });
            // go to cart with of the current user
            navigate(`/cart/${userId}`);
          }}
        >
          {/* toggle inventory to prevent users from buying out of stock items */}
          {item.numInStock === 0 ? "Out of Stock" : "Add to Cart"}
        </AddToCart>
      </StyledBox>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 370px;
  box-shadow: 0 0 10px gray;
  border-radius: 8px;
  align-items: center;
  text-align: center;
  background-color: #f5f5f5;
  /* font-family: Arial, Helvetica, sans-serif; */
  z-index: 1;

  &:hover {
    transform: scale(1.1);
    transition: .6s;
  }
`;

const ProductImage = styled.img`
  width: 250px;
  height: 200px;
  object-fit: contain;
  opacity: 0.9;
  border-radius: 10px 10px 0 0;
`;

const ProductName = styled.p`
  margin: 20px 0 30px 0;
  height: 30px;
  /* font-weight: bold; */
  color: #484848;
`;

const ProductPrice = styled.p`
  padding: 10px 15px;
`;

const StyledBox = styled.div`
  /* display: flex;
  justify-content: space-around; */
`;

const AddToCart = styled.button`
  background: #daa520;
  border: none;
  border-radius: 3px;
  text-align: center;
width: 250px;
padding:18px;
  font-weight: bold;
  margin-bottom: 5px;

  &:disabled {
    background-color: grey;
  }
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.2);
    color: white;
  }
  &:active {
    transform: scale(0.95);
  }
`;

export default ProductCard;
