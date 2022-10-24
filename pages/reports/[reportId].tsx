import type { GetServerSideProps, NextPage } from "next";
import database, { connect, Report } from "fluffy-waddle-database";
import H1 from "../../components/H1";
import Head from "../../components/Head";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table";
import { useContext } from "react";
import SidebarContext from "../../contexts/Sidebar";

import { Content } from "..";
import { formatAddress } from "../../urls";
import { SlitherDetails } from "../../types";

const ReportPage: NextPage<Report> = (report: Report) => {
  const { isOpen } = useContext(SidebarContext);
  const details = JSON.parse(report.details) as SlitherDetails;
  const rows =
    details.results.detectors?.map((detector) => ({
      check: detector.check,
      impact: detector.impact,
      confidence: detector.confidence,
      markdown: detector.markdown,
    })) || [];
  const header = Object.keys(rows![0]);
  return (
    <div>
      <Head />
      <main>
        <Sidebar />
        <Content isOpen={isOpen}>
          <H1>Report #{report.id}</H1>
          <h2>
            <a target="_blank" href={formatAddress(report)} rel="noreferrer">
              {report.contract.name}
            </a>
          </h2>
          <small>{report.tool}</small>
          <Table header={header} rows={rows} />
        </Content>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connect();
  const {
    query: { reportId },
  } = context;

  const report = await database.manager.findOne(Report, {
    where: { id: Number(reportId) },
  });

  return {
    props: JSON.parse(JSON.stringify(report)),
  };
};

export default ReportPage;
