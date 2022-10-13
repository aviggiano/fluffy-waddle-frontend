import type { NextPage } from "next";
import { createClient } from "@supabase/supabase-js";
import H1 from "../../components/H1";
import Head from "../../components/Head";
import Searchbar from "../../components/Searchbar";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import { Content } from "./styles";
import config from "../../config";

interface Props {
  header: string[];
  rows: Record<string, string>[];
}

const Dashboard: NextPage<Props> = ({ header, rows }: Props) => {
  return (
    <div>
      <Head />
      <main>
        <Sidebar />
        <Content>
          <Searchbar />
          <H1>Dashboard</H1>
          <Table header={header} rows={rows} />
        </Content>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const supabase = createClient(config.api.url, config.api.apiKey);
  const { data } = await supabase.from("statistic").select().range(0, 20);

  const rows = data!;
  const header = Object.keys(rows[0]);

  return {
    props: {
      header,
      rows,
    },
  };
}

export default Dashboard;
