import styled from "styled-components";
import { black1, gray02, gray04, gray07 } from "../../styles/colors";

export const Container = styled.div`
  min-height: 628px;
  width: 100%;

  background-color: ${black1};
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  table {
    border-collapse: collapse;

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

          width: 100%;
          min-width: 300px;
          padding-left: 24px;

          &:nth-child(1) {
            width: 300px;
          }
        }
      }
    }
  }
`;

export const Content = styled.div`
  padding: 24px;
`;
