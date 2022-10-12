import type { NextPage } from "next";
import H1 from "../../components/H1";
import Head from "../../components/Head";
import Searchbar from "../../components/Searchbar";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import { Content } from "./styles";

const header = ["id", "name"];

const rows = [
  {
    id: "1",
    name: "First",
  },
  {
    id: "2",
    name: "Second",
  },
];

const Dashboard: NextPage = () => {
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

export default Dashboard;
