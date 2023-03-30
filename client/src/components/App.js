import GlobalStyles from "./GlobalStyles";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import ProductDetails from "./ProductDetails";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cart from "./Cart";
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";
import SearchProducts from "./SearchProducts"
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import TransactionSuccess from "./TransactionSuccess"
import TransactionCancel from "./TransactionCancel"

// filter products by category to use for the dropdown filter
const filterProductsByCategory = (products, category) => {
  return products.filter((item) => item.category === category);
};
// app for page navigation and to share props to other components
function App() {
  // state for filtered category
  const [filterCategory, setFilterCategory] = useState("");
  // state for all categories
  const [categories, setCategories] = useState([]);
  // state for all items received from db
  const [items, setItems] = useState();
  // return filtered state back to none
  const [noneFilteredItems, setnoneFilteredItems] = useState([]);
  // the list of the full filtered search items 
  const [filteredItems, setFilteredItems] = useState([])
  
  // The initial fetch of the products on app load
  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => { setnoneFilteredItems(data.data)
        // Setting an array with all the categories
        // but only one time for each category
        const categories = [];
        data.data.forEach((item) => {
          if (!categories.includes(item.category))
            categories.push(item.category);
        });
        // Setting the category state
        setCategories(categories);
        // Filtering the data if one of the filters is selected
        if (filterCategory !== "") {
          const filteredResults = filterProductsByCategory(
            data.data,
            filterCategory
          );
          return filteredResults;
          // If none of the filters are selected return the data unfiltered
        } else {
          return data.data;
        }
      })
      .then((returnedData) => setItems(returnedData))
      .catch((err) => console.log(err));
  }, [filterCategory]);

  return (
    <Wrapper>
      <Router>
        <GlobalStyles />
        <ToastContainer position="top-center" autoClose={2000}/>  
        <Navbar noneFilteredItems={noneFilteredItems} setFilteredItems={setFilteredItems}/>
        
        <Routes>
          <Route path="/" element={<Homepage items={items} setFilterCategory={setFilterCategory} categories={categories} />} />
          <Route path="/About" element={<About />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/Services" element={<Services/> } />
          <Route path="/Contact" element={<Contact/> } />
          <Route path="/cart/:userId" element={<Cart noneFilteredItems={noneFilteredItems}/>} />
          <Route path="/searchProducts" element={<SearchProducts filteredItems={filteredItems}/> } />
        
          <Route path="/TransactionSuccess" element={<TransactionSuccess /> } />
          <Route path="/TransactionCancel" element={<TransactionCancel /> } />

        </Routes>
        <Footer />
      </Router>
    </Wrapper>
  );
}

const Wrapper = styled.div`
`
export default App;
