import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <meta
          name="title"
          content="fluffy-waddle - Zero-config smart contract vulnerability detection system"
        />
        <meta
          name="description"
          content="fluffy-waddle crawls etherscan and other blockchain explorers and checks for potential vulnerabilities in smart contracts"
        />
        <meta name="robots" content="all" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fluffy-waddle.com/" />
        <meta
          property="og:title"
          content="fluffy-waddle - Zero-config smart contract vulnerability detection system"
        />
        <meta
          property="og:description"
          content="fluffy-waddle crawls etherscan and other blockchain explorers and checks for potential vulnerabilities in smart contracts"
        />
        <meta
          property="og:image"
          content={`https://fluffy-waddle.com/images/logo.png`}
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fluffy-waddle.com/" />
        <meta
          property="twitter:title"
          content="fluffy-waddle - Zero-config smart contract vulnerability detection system"
        />
        <meta
          property="twitter:description"
          content="fluffy-waddle crawls etherscan and other blockchain explorers and checks for potential vulnerabilities in smart contracts"
        />
        <meta
          property="twitter:image"
          content={`https://fluffy-waddle.com/images/logo.png`}
        />
        <title>
          fluffy-waddle - Zero-config smart contract vulnerability detection
          system
        </title>
      </Head>
      <main>
        <Sidebar />
      </main>
    </div>
  );
};

export default Home;
