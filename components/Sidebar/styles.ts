import styled from "styled-components";
import {
  black1,
  blue100,
  gray04,
  gray07,
  blue025,
  white,
} from "../../styles/colors";

export const Container = styled.div<{ isOpen: boolean }>`
  height: 100%;
  width: ${(props) => (props.isOpen ? "296px" : "72px")};

  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;

  background-color: ${black1};

  span {
    display: ${(props) => (props.isOpen ? "inherit" : "none")};
  }
`;

export const Content = styled.div`
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;

  div:last-of-type {
    margin-top: auto;
  }
`;

export const Title = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${(props) => (props.isOpen ? "inherit" : "20px")};
  margin-bottom: ${(props) => (props.isOpen ? "inherit" : "12px")};

  a {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: ${(props) => (props.isOpen ? "16px" : "inherit")};
  }
`;

export const Subtitle = styled.div<{ isOpen: boolean }>`
  margin-top: 24px;
  margin-bottom: 12px;
  font-size: 12px;
  color: ${gray04};

  display: ${(props) => (props.isOpen ? "inherit" : "none")};
`;

interface Props {
  selected: boolean;
  isOpen: boolean;
}

export const Item = styled.div<Props>`
  height: 42px;
  border: 1px solid;
  border-radius: 8px;
  border-color: transparent;

  background-color: ${(props) => (props.selected ? blue025 : "inherit")};
  color: ${(props) => (props.selected ? white : gray07)};
  width: ${(props) => (props.isOpen ? "272px" : "42px")};
  margin-left: ${(props) => (props.isOpen ? "-12px" : "-10px")};

  display: flex;
  align-items: center;

  a {
    width: 100%;
    height: 100%;
    align-items: center;
    padding-left: 12px;
    display: flex;
    flex-direction: row;
    gap: 16px;
    span {
      display: ${(props) => (props.isOpen ? "inherit" : "none")};
    }
  }

  svg {
    path {
      fill: white;
      fill: ${(props) => (props.selected ? blue100 : gray04)};
    }
  }

  span {
    text-align: center;
  }

  transition: background-color 0.15s ease-in-out;
`;
