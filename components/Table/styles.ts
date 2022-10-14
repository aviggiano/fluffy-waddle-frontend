import styled from "styled-components";
import {
  black2,
  gray02,
  gray04,
  gray07,
  red,
  yellow,
  blue070,
} from "../../styles/colors";

export const Container = styled.div`
  min-height: 628px;
  width: 100%;

  background-color: ${black2};
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  table {
    border-collapse: collapse;
    table-layout: auto;
    width: 100%;

    thead {
      color: ${gray04};

      th {
        font-weight: normal;
        text-align: left;
        padding-left: 24px;

        height: 64px;

        border-bottom: 0.1px solid ${gray02};
      }
    }

    tbody {
      tr {
        border-bottom: 0.1px solid ${gray02};

        height: 64px;

        td {
          color: ${gray07};

          padding-left: 24px;
          min-width: 120px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  padding: 24px;
`;

export const Results = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Detector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 6px;
`;
export const Check = styled.div``;
export const Confidence = styled.div<{ confidence: string }>`
  svg {
    path {
      fill: white;
      fill: ${(props) => (props.confidence === "High" ? red : yellow)};
    }
  }
`;
export const Occurrence = styled.div``;
export const Impact = styled.div<{ impact: string }>`
  svg {
    path {
      fill: white;
      fill: ${(props) =>
        props.impact === "High"
          ? red
          : props.impact === "Medium"
          ? yellow
          : blue070};
    }
  }
`;
