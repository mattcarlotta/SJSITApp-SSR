/* istanbul ignore file */
import styled from "styled-components";

const LoadingItem = styled.div`
    display: block;
    color: transparent;
    user-select: none;
    width: ${({ width }) => width || "100%"};
    animation: pulse 1.2s infinite;
    margin: ${({ margin }) => margin || "0px"};
    padding: ${({ padding }) => padding || "12px 18px"};
    border: 2px solid transparent;
    border-radius: 4px;
  }
`;

export default LoadingItem;
