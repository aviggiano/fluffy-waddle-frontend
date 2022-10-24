import { Container, Content, Icons, Pages } from "./styles";

import Arrow from "../../public/images/right.svg";
import { useContext, useState } from "react";
import QueryContext, { PAGINATION_MIN } from "../../contexts/Query";

const Pagination: React.FC = () => {
  const [page, setPage] = useState(1);
  const { query, setQuery } = useContext(QueryContext);
  const refreshData = (newPage: number) => {
    const from = PAGINATION_MIN * (newPage - 1);
    const to = PAGINATION_MIN * newPage - 1;

    setQuery({
      ...query,
      from,
      to,
    });
    setPage(newPage);
  };

  return (
    <Container>
      <Content>
        <Pages>Page {page}</Pages>
        <Icons>
          <button
            type="button"
            style={{ transform: "rotate(180deg)" }}
            onClick={() => (page === 1 ? null : refreshData(page - 1))}
          >
            <Arrow />
          </button>
          <button type="button" onClick={() => refreshData(page + 1)}>
            <Arrow />
          </button>
        </Icons>
      </Content>
    </Container>
  );
};

export default Pagination;
