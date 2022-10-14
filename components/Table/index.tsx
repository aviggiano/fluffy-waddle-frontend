import React from "react";
import {
  Check,
  Confidence,
  Container,
  Content,
  Detector,
  Impact,
  Occurrence,
  Results,
} from "./styles";
import { SlitherDetails } from "../../types";
import { format as formatDate } from "date-fns";

import Triangle from "../../public/images/triangle.svg";
import Circle from "../../public/images/circle.svg";

interface Props {
  header: string[];
  rows: Record<string, string>[];
}

const isDate = (column: string): boolean =>
  column === "createdAt" || column === "updatedAt" || column === "verified";

const isDetails = (column: string): boolean => column === "details";

const formatDetails = (value: string) => (
  <Results>
    {(JSON.parse(value) as SlitherDetails).results.detectors?.map(
      ({ check, confidence, impact, id, first_markdown_element }) => (
        <Detector key={id}>
          <Check>{check}</Check>
          <Confidence confidence={confidence}>
            <Circle />
          </Confidence>
          <Impact impact={impact}>
            <Triangle />
          </Impact>
          <Occurrence></Occurrence>
        </Detector>
      )
    ) || <Detector />}
  </Results>
);

const formatColumn = (row: Record<string, string>, column: string) =>
  isDate(column)
    ? formatDate(new Date(row[column]), "yyyy-MM-dd")
    : isDetails(column)
    ? formatDetails(row[column])
    : row[column];

const Table: React.FC<Props> = ({ header, rows }: Props) => {
  console.log(header, rows);
  return (
    <Container>
      <Content>
        <table>
          <thead>
            {header.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {header.map((column) => (
                  <td key={column}>{formatColumn(row, column)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
};

export default Table;
