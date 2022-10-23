import type { GetServerSideProps, NextPage } from "next";
import database, { connect } from "fluffy-waddle-database";
import styled from "styled-components";
import H1 from "../components/H1";
import Head from "../components/Head";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { Entity } from "../types";
import Pagination from "../components/Pagination";
import { PAGINATION_MAX, PAGINATION_MIN } from "../contexts/Query";
import DropdownFilter from "../components/DropdownFilter";
import { useContext } from "react";
import SidebarContext from "../contexts/Sidebar";
import { black2 } from "../styles/colors";
import pageWidth from "../styles/pageWidth";
import { CheckFilters, ConfidenceFilters, ImpactFilters } from "../constants";

export const Content = styled.div<{ isOpen: boolean }>`
  margin-left: ${(props) => (props.isOpen ? "296px" : "72px")};
  background-color: ${black2};
  padding: 24px;

  h1 {
    text-transform: capitalize;
  }
`;

export const SelectBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${pageWidth.phone}px) {
    flex-direction: column;
    align-items: start;
    div {
      padding-left: 0px;
    }
  }
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;

  gap: 8px;
`;

interface Props {
  entity: Entity;
  header: string[];
  rows: Record<string, string>[];
}

const Dashboard: NextPage<Props> = ({ header, rows }: Props) => {
  const { isOpen } = useContext(SidebarContext);
  return (
    <div>
      <Head />
      <main>
        <Sidebar />
        <Content isOpen={isOpen}>
          <Searchbar />
          <H1>Dashboard</H1>
          <SelectBar>
            <Filters>
              <DropdownFilter
                filter="check"
                name="Check"
                values={CheckFilters}
              />
              <DropdownFilter
                filter="confidence"
                name="Confidence"
                values={ConfidenceFilters}
              />
              <DropdownFilter
                filter="impact"
                name="Impact"
                values={ImpactFilters}
              />
            </Filters>
            <Pagination />
          </SelectBar>
          <Table header={header} rows={rows} />
        </Content>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connect();
  const { query } = context;

  const from = Math.max(Number(query.from || 0), 0);
  const to = Math.max(
    Math.min(Number(query.to || PAGINATION_MIN - 1), from + PAGINATION_MAX - 1),
    from + PAGINATION_MIN - 1
  );
  const skip = from;
  const limit = to - from + 1;
  const search = ((query.search || "") as string).trim();

  console.log({ ...query, from, to, search });

  const checkSanitized = ((query.check || "") as string)
    .split(",")
    .filter((x) => CheckFilters.includes(x))
    .map((confidence) => `@.check == "${confidence}"`)
    .join(" || ");
  const confidenceSanitized = ((query.confidence || "") as string)
    .split(",")
    .filter((x) => ConfidenceFilters.includes(x))
    .map((confidence) => `@.confidence == "${confidence}"`)
    .join(" || ");
  const impactSanitized = ((query.impact || "") as string)
    .split(",")
    .filter((x) => ImpactFilters.includes(x))
    .map((impact) => `@.impact == "${impact}"`)
    .join(" || ");
  const detailsFilterSanitized = [
    confidenceSanitized,
    impactSanitized,
    checkSanitized,
  ]
    .filter((x) => x)
    .map((x) => `(${x})`)
    .join(" && ");
  const searchFilterUnsafe = search ? `c.name ~ $1 OR c.address ~ $2` : "";

  const filtersUnsafe = [
    detailsFilterSanitized
      ? `CAST(details AS jsonb) @@ 'exists($.results.detectors[*] ? (${detailsFilterSanitized}))'`
      : "",
    searchFilterUnsafe,
  ].filter((x) => x);
  const whereUnsafe = filtersUnsafe.length
    ? `
    WHERE
      ${filtersUnsafe.join(" AND ")}
  `
    : "";
  const params = [search, search].filter((x) => x);

  const rawQuery = `
  SELECT 
    r.id as id,
    TO_CHAR(r."createdAt", 'yyyy-mm-dd') as "Date",
    b.name as "Blockchain",
    CONCAT('https://', b.explorer, '.deth.net/address/', c.address) as "Address",
    c.txns as "Transactions", 
    c.balance as "Balance", 
    r.details as "Details"
  FROM contract AS c
    INNER JOIN report AS r
    ON r."contractId" = c.id
    INNER JOIN blockchain AS b
    ON b.id = c."blockchainId"
  ${whereUnsafe}
  OFFSET ${skip}
  LIMIT ${limit}
  `;
  console.log(rawQuery);

  const reports = await database.manager.query(rawQuery, params);

  const header = Object.keys(reports[0] || {}).filter((e) => e !== "id");
  const rows = reports;

  return {
    props: {
      header,
      rows,
    },
  };
};

export default Dashboard;
