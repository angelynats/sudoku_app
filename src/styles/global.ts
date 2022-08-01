import {createGlobalStyle, css} from "styled-components";

import {theme as ThemeType} from ".";
type Theme = typeof ThemeType;

export default createGlobalStyle<{theme: Theme}>`
  ${({theme}) => css`
      @keyframes radioAnimation {
          0% {
              opacity: 0;
              width: 14px;
              height: 14px;
          }
          40% {
              opacity: 1;
              width: 38px;
              height: 38px;
          }
          100% {
              opacity: 0;
              width: 14px;
              height: 14px;
          }
      }
      * {
          font-family: "Poppins", sans-serif;
          font-style: normal;
          font-weight: 500;
      }
      html {
          height: 100%;

          body {
              display: flex;
              flex-direction: column;
              height: 100%;
              width: 100%;
              margin: 0;

              #root {
                  background: ${theme.colors.background};
                  color: ${theme.colors.black};
                  display: flex;
                  height: 100%;
                  justify-content: center;
                  padding: 15px;
              }
          }
      }
  `}
`;
