import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  #root, #app, #__next {
    height: 100vh;
    background: #ebebeb;
  }

  html,body {
    min-height: 100vh;
    width: 100%;
  }

  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    font-family: "Karla Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
  }

  @keyframes wave {
    0% {
      left: -60%;
    }
    100% {
      left: 125%;
    }
  }


  @keyframes pulse {
    0% {
      border-color: #2e7c8a;
    }
    50% {
      border-color: #040f0f;
    }
    100% {
      border-color: #2e7c8a;
    }
  }

  @keyframes pop {
    0% {
      top: 6px;
      height: 46px;
    }

    50%, 100% {
      top: 19px;
      height: 21px;
    }
  }

  @keyframes delay {
    0%, 40%, 100% {
      transform: scaleY(0.05);
      -webkit-transform: scaleY(0.05);
    }

    20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
  
  @keyframes nprogress-spinner {
    0%   { 
      transform: rotate(0deg); 
    }
    100% { 
      transform: rotate(360deg); 
    }
  }

  .link {
    cursor: pointer;
    display: block;
    color: #03a9f3;
    font-size: 16px;
    text-align: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    text-transform: uppercase;
  }

  .link:hover {
    text-decoration: underline;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #d47000;

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #d47000, 0 0 5px #d47000;
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
            transform: rotate(3deg) translate(0px, -4px);
  }

  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: #d47000;
    border-left-color: #d47000;
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
            animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }
  
  *, ::after, ::before {
    box-sizing: border-box;
  }

  ::-moz-focus-inner {
    border: 0;
  }
`;

export default GlobalStyle;
