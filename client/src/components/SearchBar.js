import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

// search through product inventory. state/props passed from app
const SearchBar = ({ noneFilteredItems, setFilteredItems }) => {
  // console.log("  ~ noneFilteredItems", noneFilteredItems)
  const [value, setValue] = useState(""); // to store the search querry
  const navigate = useNavigate();

  let ResultArray = []
  let slicedResultArray = []
  
  
  const handleSelect = (e) => {
    if (e.key === "Enter" ) {
      e.preventDefault()

      if (ResultArray.length >= 1){
        setFilteredItems(ResultArray)
        navigate(`/searchProducts`)
        setValue("")
      }else{
        toast.warn("No result found !")
        
      }
    }
  }

  const handleClick = () => {
    if (ResultArray.length >= 1){
      setFilteredItems(ResultArray)
      navigate(`/searchProducts`)
      setValue("")
    }else{
      toast.warn("No result found !")
    }
  };

  const handlesubmit = (e) => { // prevent the default behavior of the page reload for the form onSubmit event handler
    e.preventDefault()
  }

  if (noneFilteredItems && value.length >= 1) { // we make sure the filtering starts only after 2 inputs have registered and we wait for our prop to load(the fetch)

    noneFilteredItems.forEach(({ name, price, _id, numInStock, imageSrc }) => {
      let upperCaseUserInput = value.toUpperCase() // to case incentise 
      let upperCaseWatchName = name.toUpperCase() // to case incentise 

      let result = upperCaseWatchName.includes(upperCaseUserInput) // if the user input = name result will be true

      if (result && numInStock >= 1) { // we check if result is true AND item not out of stock 
        ResultArray.push({ _id, name, price, imageSrc, numInStock }) // we push the filtered new object to our array 

        slicedResultArray = ResultArray.slice(0, 5) // we finally make sure to get a shallow copy with only 5 noneFilteredItems 

      }

    })

  }


  return (
    <Wrapper>
      <form onSubmit={(e) => handlesubmit(e)}>

        {!noneFilteredItems ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={handleSelect}
              placeholder="Search"
            ></Input>

            <Ok onClick={handleClick}> Search </Ok>
            <StyledUl>
              {slicedResultArray.map(({ name, price, _id, imageSrc }) => {

                let upperCaseUserInput = value.toUpperCase() // to case incentise 
                let upperCaseWatchName = name.toUpperCase() // to case incentise 

                return (
                  // a clickable link to go to each watch by its id
                  <LinkItem key={_id} to={`/product/${_id}`} onClick={() => setValue("")} >

                    <MiniWrapper>

                      <WatchImage src={imageSrc} alt="mini-WatchImages" />
                      <StyledLi>
                        {name.slice(
                          0,
                          upperCaseWatchName.indexOf(upperCaseUserInput) + value.length
                        )}

                        <span>
                          {name.slice(
                            upperCaseWatchName.indexOf(upperCaseUserInput) + value.length
                          )}
                        </span>
                        <p>Price : {price}</p>

                      </StyledLi>

                    </MiniWrapper>

                  </LinkItem>
                );
              })}
            </StyledUl>
          </>
        )}
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
width: 280px;

  input {
    width: 200px;
    
  }

  h1 {
    color: white;
  }
`;
const MiniWrapper = styled.div`
display: flex;
border-radius: 5px;
`
const WatchImage = styled.img`
width: 80px;
background-color: blue;
border-radius: 5px;
z-index: 2;
/* transform: scale(0.90); */
`
const StyledUl = styled.ul`
    background-color: beige;
    display: flex;
    flex-direction: column;
  margin-top: 10px;
  width: 400px;
  height: 0; // check
  padding: 0px 20px;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 5px 15px 5px #000000;

  p {
    color: white;
    font-style: italic;
    span {
      color: #000000;
      font-weight: 100;
    }
  }

  span {
    /* font-weight: bold; */
  } 
`;

const StyledLi = styled.li`
  width: 100%;
  color: white;
  padding: 10px 30px;
  border-radius: 5px;

  cursor: pointer;
  background-color: #d0b180;
  /* border-radius: 15px; */
  z-index: 2;

  :hover{
  background-color: #d8be97;
  }

`;

const Input = styled.input`
  width: 200px;
  outline: none;
  margin-top: 10px;
`;

const Ok = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

const LinkItem = styled(NavLink)`
text-decoration: none;
`
export default SearchBar;
