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
  const [route, setRoute] = useState(router.asPath);
  const refreshData = (newPage: number) => {
    const from = PAGINATION_MIN * (newPage - 1) + 1;
    const to = PAGINATION_MIN * newPage;

    const route = router.asPath.replace(/\?.*/, "");
    router.push({
      pathname: route,
      query: { from, to },
    });
    setFrom(from);
    setTo(to);
    setPage(newPage);
    setRoute(route);
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log({ url, route });
      const newRoute = url.replace(/\?.*/, "");
      if (newRoute !== route) {
        setFrom(0);
        setTo(PAGINATION_MIN);
        setPage(1);
        setRoute(url);
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [route, router.events, setFrom, setTo]);

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
