import { Container, Content, Icons, Pages } from "./styles";

import Arrow from "../../public/images/right.svg";
import { useContext, useState } from "react";
import QueryContext, { PAGINATION_MIN } from "../../contexts/Query";
import { useRouter } from "next/router";

const Pagination: React.FC = () => {
  const [page, setPage] = useState(1);
  const { query, setQuery } = useContext(QueryContext);
  const router = useRouter();
  const refreshData = (newPage: number) => {
    const from = PAGINATION_MIN * (newPage - 1);
    const to = PAGINATION_MIN * newPage - 1;

    // const route = router.asPath.replace(/\?.*/, "");
    // router.push({
    //   pathname: route,
    //   query: {
    //     ...router.query,
    //     from,
    //     to,
    //   },
    // });
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
