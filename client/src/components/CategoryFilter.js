import styled from "styled-components";

// component to provide filtered item content to the homepage receiving the state/props from homepage, state set in app
const CategoryFilter = ({ setFilterCategory, categories }) => {
    // filter homepage page content by the user's selected value
  const handleChange = (event) => {
    setFilterCategory(event.target.value);
  };
  return (
    <Wrapper>
      <select onChange={handleChange}>
        <option value="">Select a category</option>
        {categories &&
          categories.map((category) => {
            return (
              <option value={category} key={category}>
                {category}
              </option>
            );
          })}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
select{
  height: 35px;
  width: 150px;
  border-radius: 5px;
  border: none;
}
`;

export default CategoryFilter;
