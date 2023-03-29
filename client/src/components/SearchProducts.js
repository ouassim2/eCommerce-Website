import styled from "styled-components"
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

const SearchProducts = ({ filteredItems}) => {

  return (
    <Wrapper>
       {filteredItems ? (
          <ProductGrid>
            {/* loop over product items to render each item from the ProductCard component */}
            {filteredItems.map((item) => {
              return <ProductCard key={item._id} item={item} />;
            })}
          </ProductGrid>
        ) : (
          <Loading>
            <LoadingSpinner />
          </Loading>
        )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
`

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
export default SearchProducts;
