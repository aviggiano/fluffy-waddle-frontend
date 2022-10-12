import styled from "styled-components";
import { black1 } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;

  padding: 12px;
  gap: 8px;

  input {
    font-size: 16px;
    border: none;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }
`;
