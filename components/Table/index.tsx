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

interface Props {
  header: string[];
  rows: Record<string, string>[];
}

const isDate = (column: string): boolean =>
  column === "createdAt" || column === "updatedAt" || column === "verified";

const isDetails = (column: string): boolean =>
  column.toLowerCase() === "details";

const formatDetails = (value: string) => (
  <Results>
    {(JSON.parse(value) as SlitherDetails).results.detectors?.map(
      ({ check, confidence, impact, id, first_markdown_element }) => (
        <Detector key={id}>
          <Check>{check}</Check>
          <Confidence confidence={confidence}>{confidence}</Confidence>
          <Impact impact={impact}>{impact}</Impact>
          <Occurrence>
            {first_markdown_element.replace(/^.*\/(.*\.com\-|.*\.io\-)?/, "")}
          </Occurrence>
        </Detector>
      )
    ) || <Detector />}
  </Results>
);

const isAddress = (column: string): boolean => column === "Address";

const formatAddress = (value: string) => (
  <a target="_blank" href={value} rel="noreferrer">
    <span>{value.replace(/.*\//, "").replace("#code", "")}</span>
  </a>
);

const formatColumn = (row: Record<string, string>, column: string) =>
  isDate(column)
    ? formatDate(new Date(row[column]), "yyyy-MM-dd")
    : isDetails(column)
    ? formatDetails(row[column])
    : isAddress(column)
    ? formatAddress(row[column])
    : row[column];

const Table: React.FC<Props> = ({ header, rows }: Props) => {
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
