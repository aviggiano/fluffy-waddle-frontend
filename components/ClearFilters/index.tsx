import { Container, Content } from "./styles";

import Close from "../../public/images/close.svg";
import { useContext } from "react";
import { useRouter } from "next/router";
import QueryContext from "../../contexts/Query";

const ClearFilters: React.FC = () => {
  const { clearFilters, hasFilters } = useContext(QueryContext);
  const router = useRouter();
  const onClick = () => {
    clearFilters();
    // const route = router.asPath.replace(/\?.*/, "");
    // router.push({
    //   pathname: route,
    // });
  };

  return (
    <Container hasFilters={hasFilters}>
      <Content>
        <button onClick={onClick}>
          <Close />
          <div>Clear filters</div>
        </button>
      </Content>
    </Container>
  );
};

export default ClearFilters;
