import type { GetServerSideProps, NextPage } from "next";
import { createClient } from "@supabase/supabase-js";
import H1 from "../components/H1";
import Head from "../components/Head";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { Content } from "./styles";
import config from "../config";
import { Entity } from "../types";

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
  const entity: Entity = (query.entity as string).substring(
    0,
    (query.entity as string).length - 1
  ) as Entity;
  const supabase = createClient(config.api.url, config.api.apiKey);
  console.log({ entity });
  const { data } = await supabase.from(entity).select().range(0, 20);

  const rows = data!;
  const header = Object.keys(rows[0]);

  return {
    props: {
      header,
      rows,
    },
  };
};

export default Dashboard;
