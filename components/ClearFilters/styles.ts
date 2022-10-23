import styled from "styled-components";
import { gray02, gray04, gray07 } from "../../styles/colors";

export const Container = styled.div<{ hasFilters: boolean }>`
  display: ${(props) => (props.hasFilters ? "flex" : "none")};
  flex-direction: column;

  svg {
    path {
      fill: ${gray04};
    }
  }
`;

export const Content = styled.div`
  button {
    min-width: 88px;
    height: 28px;
    background: none;
    cursor: pointer;
    color: ${gray07};

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border: 0.1px solid ${gray02};
    border-radius: 8px;
  }
`;
