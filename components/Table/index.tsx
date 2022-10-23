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
import { useRouter } from "next/router";
import Markdown from "react-markdown";
import Link from "next/link";

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
    <span>{value.replace(/.*\//, "")}</span>
  </a>
);

const isId = (column: string): boolean => column === "id";

const formatId = (value: string, ...rest: unknown[]) => {
  const route = rest[0];
  return (
    <Link href={`${route}/${value}`}>
      <a href={`${route}/${value}`}>
        <span>{value}</span>
      </a>
    </Link>
  );
};

const isMarkdown = (column: string): boolean => column === "markdown";

const formatMarkdown = (value: string) => {
  return value
    .split("\n")
    .map((line) => line.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"))
    .map((line, index) => <Markdown key={index}>{line}</Markdown>)
    .reduce(
      (acc: any, x: JSX.Element) => (acc === null ? [x] : [acc, x]),
      null
    );
};

const formatColumn = (
  row: Record<string, string>,
  column: string,
  ...rest: unknown[]
) =>
  isDate(column)
    ? formatDate(new Date(row[column]), "yyyy-MM-dd")
    : isDetails(column)
    ? formatDetails(row[column])
    : isAddress(column)
    ? formatAddress(row[column])
    : isId(column)
    ? formatId(row[column], ...rest)
    : isMarkdown(column)
    ? formatMarkdown(row[column])
    : row[column];

const Table: React.FC<Props> = ({ header, rows }: Props) => {
  const router = useRouter();
  const route = router.asPath.replace(/\?.*/, "");
  return (
    <Container>
      <Content>
        <table>
          <thead>
            <tr>
              {header.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id || index}>
                {header.map((column) => (
                  <td key={column}>{formatColumn(row, column, route)}</td>
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
