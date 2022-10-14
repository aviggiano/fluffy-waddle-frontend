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

const Content = styled.div`
  margin-left: 296px;
  padding: 24px;

  h1 {
    text-transform: capitalize;
  }
`;

interface Props {
  entity: Entity;
  header: string[];
  rows: Record<string, string>[];
}

const Dashboard: NextPage<Props> = ({ header, rows, entity }: Props) => {
  return (
    <div>
      <Head />
      <main>
        <Sidebar />
        <Content>
          <Searchbar />
          <H1>{entity}</H1>
          <Table header={header} rows={rows} />
        </Content>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const from = Number(query.from || 0);
  const to = Number(query.to || 10);
  const entity: Entity = query.entity as Entity;
  const table = entity.substring(0, entity.length - 1);
  const supabase = createClient(config.api.url, config.api.apiKey);
  console.log({ entity, table });
  const { data } = await supabase.from(table).select().range(from, to);

  const header = Object.keys(data![0]);
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
