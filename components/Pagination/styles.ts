import styled from "styled-components";
import { gray02, gray07 } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  gap: 12px;
`;

export const Pages = styled.div`
  color: ${gray07};
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  button {
    background: none;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 0.1px solid ${gray02};
    border-radius: 8px;

    height: 40px;
    width: 40px;
  }
`;
