import styled from "styled-components";
import { useState } from "react";

// order form for service request
const Services = () => {
  // used for showing the confirmation page for the services submission
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    fullName: undefined,
    model: undefined,
    serialNumber: undefined,
    address: undefined,
    email: undefined,
    phone: undefined,
  });
  //set formData when user enters information
  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  // submit formData when submit button clicked and reset form
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsConfirmed(true);
    document.getElementById("form").reset();
  };

  return (
    <BodyWrapper>
      {!isConfirmed ? (
        <Wrapper>
          <h1>Repair Form</h1>
          <form onChange={handleOnChange} onSubmit={handleFormSubmit} id="form">
            <MiniWrapper>
              <label>Full name:</label>
              <input autoFocus type="text" id="fullName" required />
            </MiniWrapper>
            <MiniWrapper>
              <label>Watch Model:</label>
              <input type="text" id="model" required />
            </MiniWrapper>
            <MiniWrapper>
              <label>Serial number:</label>
              <input type="text" id="serialNumber" required />
            </MiniWrapper>
            <MiniWrapper>
              <label>Street address:</label>
              <input type="text" id="address" required />
            </MiniWrapper>
            <MiniWrapper>
              <label>Email address:</label>
              <input type="email" id="email" required />
            </MiniWrapper>
            <MiniWrapper>
              <label>Phone number:</label>
              <input type="tel" id="phone" required />
            </MiniWrapper>
            <footer>
              <ClearButton type="reset">Clear</ClearButton>
              <SubmitButton type="submit">Submit</SubmitButton>
            </footer>
          </form>
        </Wrapper>
      ) : (
        <Confirmation>
          <h2>Your Watch is staged for repair!</h2>
          <h2>We sent a prepaid shipping label to your email address.</h2>
          <h3>
            Name: <Detail>{formData.fullName}</Detail>
          </h3>
          <h3>
            Model: <Detail>{formData.model}</Detail>
          </h3>
          <h3>
            Serial Number: <Detail>{formData.serialNumber}</Detail>
          </h3>
          <h3>
            Address: <Detail>{formData.address}</Detail>
          </h3>
          <h3>
            Email: <Detail>{formData.email}</Detail>
          </h3>
          <h3>
            Phone: <Detail>{formData.phone}</Detail>
          </h3>
        </Confirmation>
      )}
    </BodyWrapper>
  );
};

const BodyWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f0ead6;
`;

const Wrapper = styled.div`
  margin-top: 32px;
  width: 380px;
  height: 450px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);

  h1 {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 20px;
  }

  input {
    border: 1px inset lightgray;
    border-radius: 3px;
    margin-top: 5px;
    width: 170px;
    height: 20px;
  }

  footer {
    display: flex;
    justify-content: space-between;
    margin-top: 35px;
  }
`;

const Confirmation = styled(Wrapper)`
  background: #013f06;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 22px;
    margin-bottom: 20px;
  }

  h3 {
    margin-top: 15px;
    font-size: 25px;
  }
`;

const Detail = styled.span`
  color: #daa521;
`;

const MiniWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  color: #555555;
`;

const ClearButton = styled.button`
  font-size: 15px;
  background-color: #023f05;

  color: white;
  border-radius: 5px;
  padding: 8px 40px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #326841;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const SubmitButton = styled.button`
  font-size: 15px;
  background: #daa520;

  color: white;
  border-radius: 5px;
  padding: 8px 40px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #eec64f;
  }

  &:active {
    transform: scale(0.9);
  }
`;
export default Services;
