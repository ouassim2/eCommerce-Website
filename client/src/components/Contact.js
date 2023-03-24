import styled from "styled-components";
import { HiPhone, HiEnvelope, HiChatBubbleLeft} from "react-icons/hi2";

// component to render company contact information
const Contact =() => {

    return (
        <Wrapper>
            <Header>
                <h2>Contact Us</h2>
                <p>Need help? We are here for you 24/7 even when we rather be sleeping.  </p>
            </Header>                
            <Track>
                <h3>Track Your Order</h3>
                <p>Find the latest shipping update on your order.</p>
                <TrackButton> GET MY ORDER STATUS </TrackButton>
            </Track>            
            <ContactContainer>
                <Chat>
                    <HiChatBubbleLeft size="30" />
                    <p>Chat with us now.</p>
                    <p>Get an instant response</p>
                    <ChatButton>CHAT NOW</ChatButton>
                </Chat>
                <Email>
                    <HiEnvelope size="30" />
                    <p>Email us anytime.</p>
                    <p>Let us know how we can help</p>
                    <a href="mailto:info@support.com" >info@support.com</a>
                </Email>
                <Call>
                    <HiPhone size="30" />
                    <p>Give us a call</p>
                    <p>Talk with our expert</p>
                    <Phone>1-800-555-5555</Phone>
                </Call>
            </ContactContainer>
        </Wrapper>
    )
}

export default Contact;

const Wrapper = styled.div`
height: 100vh;
background: #f0ead6;
display:flex;
flex-direction:column;
align-items: center;
justify-content: center;
`;
const Header = styled.div`
margin:25px;
    h2{
        border-bottom: 2px #A0A0A0 solid;
        margin-bottom:30px;
        text-align: center;
        font-size: 30px;
        
    }
`;
const Track = styled.div`
    background-color: #f5f5f5;
    padding: 20px;    
    text-align:center;
    width: 450px;
    border-radius: 10px;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
    p{
        margin:10px;
    }
`;
const TrackButton= styled.button`
    background-color:#023f05;
    color:white;
    border: none;
    padding: 20px;
    border-radius: 5px;
&:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1);
  }
  `;
const ContactContainer = styled.div`
    margin: 30px;
    display:flex;
    border-radius: 10px;
`;
const Chat = styled.div`
    background-color: #f5f5f5;
    margin: 30px;
    width:200px;
    height: 225px;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
    p{
        margin:10px;
    }
`;
const ChatButton= styled.button`
     margin-top:20px;
    background-color: #023f05;
    color:white;
    padding: 10px;
    border-radius: 5px;
    border:none;
&:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1);
  }
  `;
const Email = styled.div`
    background-color: #f5f5f5;
    margin: 30px;
    width:200px;
    height: 225px;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
    p{
        margin:10px;
    }
    a {
        margin-top:20px;
        font-weight: bold;
        color: #383838;
    }
`;
const Call = styled.div`
    background-color: #f5f5f5;
    margin: 30px;
    width:200px;
    height: 225px;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
    p{
        margin:10px;
    }
`;
const Phone = styled.p`
    font-weight: bold;
    margin-top:40px;
`;
