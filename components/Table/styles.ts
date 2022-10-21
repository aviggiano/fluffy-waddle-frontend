import styled from "styled-components";
import {
  black2,
  gray02,
  gray04,
  gray07,
  red,
  yellow,
  info,
  optimization,
  blue070,
} from "../../styles/colors";
import pageWidth from "../../styles/pageWidth";

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
      border-bottom: 0.1px solid ${gray02};

      @media (max-width: ${pageWidth.phone}px) {
        display: flex;
        flex-direction: column;
        height: unset;
        width: calc(100vw - 72px - 48px);
        padding-bottom: 24px;
      }

      th {
        font-weight: normal;
        text-align: left;
        padding-left: 24px;

        height: 64px;

        @media (max-width: ${pageWidth.phone}px) {
          border: unset;
          height: unset;
          padding: unset;
        }
      }
    }

    tbody {
      tr {
        border-bottom: 0.1px solid ${gray02};

        height: 64px;

        @media (max-width: ${pageWidth.phone}px) {
          display: flex;
          flex-direction: column;
          height: unset;
          padding-top: 24px;
          padding-bottom: 24px;

          width: calc(100vw - 72px - 48px);
        }

        td {
          color: ${gray07};

          padding-left: 24px;
          min-width: 120px;

          @media (max-width: ${pageWidth.phone}px) {
            padding: unset;
          }
        }
      }
    }
  }
`;

export const Content = styled.div`
  padding: 24px;

  @media (max-width: ${pageWidth.phone}px) {
    padding: unset;
  }

  a {
    text-decoration: underline;
    &:hover {
      color: ${blue070};
    }

    @media (max-width: ${pageWidth.phone}px) {
      span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

export const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 300px;
  padding-top: 12px;
  padding-bottom: 12px;

  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`;
export const Detector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 6px;
`;
export const Check = styled.div``;
export const Confidence = styled.div<{ confidence: string }>`
  height: 24px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.confidence === "High"
      ? red
      : props.confidence === "Medium"
      ? yellow
      : props.confidence === "Low"
      ? info
      : optimization};
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`;
export const Occurrence = styled.div``;
export const Impact = styled.div<{ impact: string }>`
  height: 24px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.impact === "High"
      ? red
      : props.impact === "Medium"
      ? yellow
      : props.impact === "Low"
      ? info
      : optimization};
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`;
