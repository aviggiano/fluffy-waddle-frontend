import { Container, Content } from "./styles";

import Close from "../../public/images/close.svg";
import { useContext } from "react";
import QueryContext from "../../contexts/Query";

const ClearFilters: React.FC = () => {
  const { clearFilters, hasFilters } = useContext(QueryContext);

  return (
    <Container hasFilters={hasFilters}>
      <Content>
        <button onClick={clearFilters}>
          <Close />
          <div>Clear filters</div>
        </button>
      </Content>
    </Container>
  );
};

export default ClearFilters;
