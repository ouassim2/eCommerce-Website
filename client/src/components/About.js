import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineLinkedin, AiFillGithub } from "react-icons/ai";

//component to render information about the team 
const About = () => {
  return (
    <StyledDiv>
      <Background>{/* <h3> About Us</h3> */}</Background>
      <h2>Meet the Team</h2>
      <div className="wrapper">
        <div className="panel">
          <div>
            <img
              src="https://cdn3.iconfinder.com/data/icons/developers-iconset/90/Developers_Colorai-12-512.png"
              alt=""
            />
          </div>
          <h3 className="name">Lisa Maloney</h3>
          <p className="position">Web Developer</p>

          <p className="background">
            “I am so clever that sometimes I don't understand a single word of
            what I am saying.” - Oscar Wilde
          </p>
          <div className="socials">
            <Link to="#">
              <AiOutlineLinkedin size="30" />
            </Link>
            <Link to="#">
              <AiFillGithub size="30" />
            </Link>
          </div>
        </div>
        <div className="panel">
          <div>
            <img
              src="https://cdn3.iconfinder.com/data/icons/developers-iconset/90/Developers_Colorai-08-512.png"
              alt=""
            />
          </div>
          <h3 className="name">Aaron Kagan</h3>
          <p className="position">Web Developer</p>

          <p className="background">
            “All the things I really like to do are either immoral, illegal or
            fattening.” - Alexander Woollcott
          </p>
          <div className="socials">
            <Link to="#">
              <AiOutlineLinkedin size="30" />
            </Link>
            <Link to="#">
              <AiFillGithub size="30" />
            </Link>
          </div>
        </div>
        <div className="panel">
          <div>
            <img src="https://www.ezsec.org/img/job3.png" alt="" />
          </div>
          <h3 className="name">Ouassim</h3>
          <p className="position">Web Developer</p>

          <p className="background">
            “I am neither especially clever nor especially gifted. I am only
            very, very curious.” - Albert Einstein
          </p>
          <div className="socials">
            <Link to="#">
              <AiOutlineLinkedin size="30" />
            </Link>
            <Link to="#">
              <AiFillGithub size="30" />
            </Link>
          </div>
        </div>
        <div className="panel">
          <div>
            <img
              src="https://cdn3.iconfinder.com/data/icons/developers-iconset/90/Developers_Colorai-10-512.png"
              alt=""
            />
          </div>
          <h3 className="name">Fennie Tang</h3>
          <p className="position">Web Developer</p>

          <p className="background">
            “My favorite machine at the gym is the vending machine.” - Caroline
            Rhea
          </p>
          <div className="socials">
            <Link to="#">
              <AiOutlineLinkedin size="30" />
            </Link>
            <Link to="#">
              <AiFillGithub size="30" />
            </Link>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default About;

const StyledDiv = styled.div`
  padding: 0;
  margin: 0;
  width: 100vw;
  min-height: calc(100vh - 120px);
  font-family: Arial, Helvetica, sans-serif;
  background-color:#f0ead6 ;
  h2 {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px;
    font-size: 30px;
    color: #383838;
  }
  .wrapper {
    display: flex;
    /* margin-bottom: 75px; */
  }
  .panel-wrapper {
    display: flex;
    /* justify-content: space-evenly; */
    align-items: center;
    margin-top: 80px;
    flex-flow: wrap;
  }
  .panel {
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: center;
    margin: 20px;
  }

  img {
    height: 140px;
    width: auto;
    border-radius: 50%;
    border: 2px solid black;
  }

  .position {
    border-bottom: 4px solid black;
  }
  .background {
    margin-top: 30px;
    text-align: justify;
    font-size: 13px;
    margin-bottom: 30px;
  }
  .socials {
    display: flex;

    margin: 10px;
    color: black;
    font-size: 20px;
  }
  a {
    color: black;
    padding: 10px;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 350px;
  background: url(/images/BannerAboutUs.jpeg) center center;
  background-size: 100%;
  background-repeat: no-repeat;

  h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2.8em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 100px;
    color: grey;
  }
`;
