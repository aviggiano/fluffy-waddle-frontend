import { Container, Content, Icons, Pages } from "./styles";

import Left from "../../public/images/left.svg";
import Right from "../../public/images/right.svg";
import { useContext, useEffect, useState } from "react";
import QueryContext, { PAGINATION_MIN } from "../../contexts/Query";
import { useRouter } from "next/router";

const Pagination: React.FC = () => {
  const [page, setPage] = useState(1);
  const { setFrom, setTo } = useContext(QueryContext);
  const router = useRouter();
  const refreshData = (newPage: number) => {
    const from = PAGINATION_MIN * (newPage - 1);
    const to = PAGINATION_MIN * newPage - 1;

    const route = router.asPath.replace(/\?.*/, "");
    router.push({
      pathname: route,
      query: {
        ...router.query,
        from,
        to,
      },
    });
    setFrom(from);
    setTo(to);
    setPage(newPage);
  };

  return (
    <Container>
      <Content>
        <Pages>Page {page}</Pages>
        <Icons>
          <button
            type="button"
            onClick={() => (page === 1 ? null : refreshData(page - 1))}
          >
            <Left />
          </button>
          <button type="button" onClick={() => refreshData(page + 1)}>
            <Right />
          </button>
        </Icons>
      </Content>
    </Container>
  );
};

export default Pagination;
