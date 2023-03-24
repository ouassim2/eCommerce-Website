import { ImSpinner2 } from "react-icons/im";
import styled from "styled-components";


// component that creates & displays the loading page image
const LoadingSpinner = () => {
  return <Spinner></Spinner>;
};

const Spinner = styled(ImSpinner2)`
  animation-name: spinner;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  font-size: 120px;
  font-weight: 100;
  color: white;
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

export default LoadingSpinner;
