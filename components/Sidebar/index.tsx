import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import { Container, Content, Item, Subtitle, Title } from "./styles";

import logo from "../../public/images/logo.png";
import Blockchain from "../../public/images/blockchain.svg";
import Contract from "../../public/images/contract.svg";
import Report from "../../public/images/report.svg";
import Statistic from "../../public/images/statistic.svg";

const items = [
  {
    name: "Blockchains",
    href: "/blockchain",
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

  return (
    <Container>
      <Content>
        <Title>
          <Link href="/">
            <a>
              <Image alt="logo" src={logo} width="56px" height="56px" />
              <span>
                <b>fluffy-waddle</b>
              </span>
            </a>
          </Link>
        </Title>
        <Subtitle>DASHBOARDS</Subtitle>
        {items.map((item, index) => (
          <Item
            key={item.name}
            selected={
              selectedIndex === -1 ? index === 0 : index === selectedIndex
            }
          >
            <Link href={item.href}>
              <a>
                {item.image}
                <span>{item.name}</span>
              </a>
            </Link>
          </Item>
        ))}
      </Content>
    </Container>
  );
};

export default Sidebar;
