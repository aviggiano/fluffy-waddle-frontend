import React from "react";
import { Container, Content } from "./styles";

import Search from "../../public/images/search.svg";

const Searchbar: React.FC = () => {
  return (
    <Container>
      <Content>
        <Search />
        <input type="text" placeholder="Search..." />
      </Content>
    </Container>
  );
};

export default Searchbar;
