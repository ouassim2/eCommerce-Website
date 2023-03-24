import ProductCard from "./ProductCard";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import Videobg from "../assets/watch.mp4";
import CategoryFilter from "./CategoryFilter";

// main page displays all the products and category filter bar recieves state/props from the app
const Homepage = ({ items, categories, setFilterCategory }) => {
  return (
    <>
      <StyledDiv>
        <Video src={Videobg} autoPlay loop muted />
      <CategoryFilter
        setFilterCategory={setFilterCategory}
        categories={categories}
      />
        {items ? (
          <ProductGrid>
            {/* loop over product items to render each item from the ProductCard component */}
            {items.map((item) => {
              return <ProductCard key={item._id} item={item} />;
            })}
          </ProductGrid>
        ) : (
          <Loading>
            <LoadingSpinner />
          </Loading>
        )}
      </StyledDiv>
    </>
  );
};

const StyledDiv = styled.div`
  margin: 0px;
  padding: 0px;
  min-height: calc(100vh - 469px);

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background: #f0ead6;
`;

const ProductGrid = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: 250px 250px 250px 250px;
  justify-content: center;
  gap: 45px;
  margin-bottom: 30px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20vh;
  height: 80vh;
`;

const Video = styled.video`
  width: 100vw;
  /* height: 350px; */
`;

export default Homepage;
