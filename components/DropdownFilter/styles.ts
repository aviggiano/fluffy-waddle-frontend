import styled from "styled-components";
import { black1, blue100, gray02, gray07, white } from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
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

export const DropdownContent = styled.div<{ n: number; isOpen: boolean }>`
  position: absolute;
  margin-top: calc(28px + 8px);
  padding-top: 4px;
  padding-bottom: 4px;

  min-width: calc(2 * 88px);

  border: 0.1px solid ${gray02};
  border-radius: 8px;
  background-color: ${black1};

  display: ${(props) => (props.isOpen ? "grid" : "none")};
  grid-template-columns: repeat(${(props) => (props.n > 5 ? 4 : 1)}, 1fr);

  gap: 4px;
  transition: all 0.15s ease-in-out;
`;

export const Button = styled.button<{ filtered: boolean }>`
  background: none;
  cursor: pointer;
  border: none;
  color: inherit;

  div {
    border: 2px solid transparent;
    border-color: ${(props) => (props.filtered ? white : "transparent")};

    transition: all 0.15s ease-in-out;
  }
`;
