import styled from "styled-components";
import { gray07 } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 56px;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;

  padding: 12px;
  gap: 8px;

  input {
    width: 100%;
    font-size: 16px;
    border: none;
    background-color: transparent;
    color: ${gray07};

    &:focus {
      outline: none;
    }
  }
`;
