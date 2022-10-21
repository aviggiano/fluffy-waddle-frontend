import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import { Container, Content, Item, Subtitle, Title } from "./styles";

import logo from "../../public/images/logo.png";
import Dashboard from "../../public/images/dashboard.svg";
import Left from "../../public/images/left.svg";
import Blockchain from "../../public/images/blockchain.svg";
import Contract from "../../public/images/contract.svg";
import Report from "../../public/images/report.svg";
import Statistic from "../../public/images/statistic.svg";
import SidebarContext from "../../contexts/Sidebar";

const home = {
  name: "Home",
  href: "/",
  image: <Dashboard />,
};
const hideSidebar = {
  name: "Hide sidebar",
  href: "",
  image: <Left />,
};

const items = [
  {
    name: "Blockchains",
    href: "/blockchains",
    image: <Blockchain />,
  },
  {
    name: "Contracts",
    href: "/contracts",
    image: <Contract />,
  },
  {
    name: "Reports",
    href: "/reports",
    image: <Report />,
  },
  {
    name: "Statistics",
    href: "/statistics",
    image: <Statistic />,
  },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const selectedIndex = items.findIndex((item) =>
    router.asPath.includes(item.href)
  );
  const { isOpen, setIsOpen } = useContext(SidebarContext);

  return (
    <Container isOpen={isOpen}>
      <Content>
        <Title isOpen={isOpen}>
          <Link href="/">
            <a>
              <Image alt="logo" src={logo} width="56px" height="56px" />
              <span>
                <b>fluffy-waddle</b>
              </span>
            </a>
          </Link>
        </Title>
        <Subtitle isOpen={isOpen}>DASHBOARDS</Subtitle>
        <Item key={home.name} selected={selectedIndex === -1} isOpen={isOpen}>
          <Link href={home.href}>
            <a>
              {home.image}
              <span>{home.name}</span>
            </a>
          </Link>
        </Item>
        <Subtitle isOpen={isOpen}>ENTITIES</Subtitle>
        {items.map((item, index) => (
          <Item
            key={item.name}
            selected={index === selectedIndex}
            isOpen={isOpen}
          >
            <Link href={item.href}>
              <a>
                {item.image}
                <span>{item.name}</span>
              </a>
            </Link>
          </Item>
        ))}
        <Item selected={false} isOpen={isOpen}>
          <Link href={hideSidebar.href}>
            <a
              onClick={() => setIsOpen(!isOpen)}
              style={isOpen ? {} : { transform: "rotate(180deg)" }}
            >
              {hideSidebar.image}
              <span>{hideSidebar.name}</span>
            </a>
          </Link>
        </Item>
      </Content>
    </Container>
  );
};

export default Sidebar;
