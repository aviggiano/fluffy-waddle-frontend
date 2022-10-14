import styled from "styled-components";
import {
  black1,
  blue100,
  gray04,
  gray07,
  blue025,
  white,
} from "../../styles/colors";

export const Container = styled.div`
  height: 100%;
  width: 296px;

  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;

  background-color: ${black1};
`;

export const Content = styled.div`
  padding: 24px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
`;

export const Subtitle = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;
  font-size: 12px;
  color: ${gray04};
`;

interface Props {
  selected: boolean;
}

export const Item = styled.div<Props>`
  height: 44px;
  border: 1px solid;
  border-radius: 8px;
  border-color: transparent;

  background-color: ${(props) => (props.selected ? blue025 : "unset")};
  color: ${(props) => (props.selected ? white : gray07)};
  width: 272px;
  margin-left: -12px;

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

  transition: all 0.15s ease-in-out;
`;
