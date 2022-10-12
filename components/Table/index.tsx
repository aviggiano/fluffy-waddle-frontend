import React from "react";
import { Container, Content } from "./styles";

interface Props {
  header: string[];
  rows: Record<string, string>[];
}

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
                  <td key={column}>{row[column]}</td>
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
