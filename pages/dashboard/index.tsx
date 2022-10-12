import type { NextPage } from "next";
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
  const url = `${config.api.url}/report?select=*&limit=100`;
  console.log({ url });
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.api.apiKey}`,
      apiKey: config.api.apiKey,
    },
  });
  const rows = await res.json();
  const header = Object.keys(rows[0]);
  console.log(rows);

  return {
    props: {
      header,
      rows,
    },
  };
}

export default Dashboard;
