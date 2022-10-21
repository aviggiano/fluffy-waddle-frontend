import type { GetServerSideProps, NextPage } from "next";
import { createClient } from "@supabase/supabase-js";
import styled from "styled-components";
import H1 from "../components/H1";
import Head from "../components/Head";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import config from "../config";
import { Entity } from "../types";
import Pagination from "../components/Pagination";
import { PAGINATION_MAX, PAGINATION_MIN } from "../contexts/Query";
import { useContext } from "react";
import SidebarContext from "../contexts/Sidebar";
import { black2 } from "../styles/colors";

const Content = styled.div<{ isOpen: boolean }>`
  margin-left: ${(props) => (props.isOpen ? "296px" : "72px")};
  background-color: ${black2};
  padding: 24px;

  h1 {
    text-transform: capitalize;
  }
`;

const SelectBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  entity: Entity;
  header: string[];
  rows: Record<string, string>[];
}

const Dashboard: NextPage<Props> = ({ header, rows, entity }: Props) => {
  const { isOpen } = useContext(SidebarContext);
  return (
    <div>
      <Head />
      <main>
        <Sidebar />
        <Content isOpen={isOpen}>
          <Searchbar />
          <H1>{entity}</H1>
          <SelectBar>
            <Pagination />
          </SelectBar>
          <Table header={header} rows={rows} />
        </Content>
      </main>
    </div>
  );
};

const SearchEntityColumnMap: Record<Entity, string[]> = {
  blockchain: ["name"],
  contract: ["address", "name"],
  report: [],
  statistic: [],
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const from = Math.max(Number(query.from || 0), 0);
  const to = Math.max(
    Math.min(Number(query.to || PAGINATION_MIN - 1), from + PAGINATION_MAX - 1),
    from + PAGINATION_MIN - 1
  );
  const search = query.search || "";

  console.log({ ...query, from, to, search });

  const entityRoute: string = query.entity as string;
  const entity = entityRoute.substring(0, entityRoute.length - 1) as Entity;

  const or = SearchEntityColumnMap[entity]
    .map((column) => `${column}.ilike.%${search}%`)
    .join(",");

  const supabase = createClient(config.api.url, config.api.apiKey);
  let select = supabase.from(entity).select();
  if (or) {
    select = select.or(or);
  }
  select = select.order("createdAt", { ascending: false }).range(from, to);

  const { data } = await select.select();

  const header = Object.keys(data![0] || {});
  const rows = data!;

  return {
    props: {
      header,
      rows,
      entity,
    },
  };
};

export default Dashboard;
