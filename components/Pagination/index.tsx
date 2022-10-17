import { Container, Content, Icons, Pages } from "./styles";

import Left from "../../public/images/left.svg";
import Right from "../../public/images/right.svg";
import { useContext, useEffect, useState } from "react";
import PaginationContext from "../../contexts/Pagination";
import { useRouter } from "next/router";

const Pagination: React.FC = () => {
  const { page, setPage } = useContext(PaginationContext);
  const router = useRouter();
  const [route, setRoute] = useState(router.asPath);
  const refreshData = (newPage: number) => {
    const route = router.asPath.replace(/\?.*/, "");
    router.push({
      pathname: route,
      query: { from: 10 * (newPage - 1), to: 10 * newPage },
    });
    setPage(newPage);
    setRoute(route);
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log({ url, route });
      const newRoute = url.replace(/\?.*/, "");
      if (newRoute !== route) {
        setPage(1);
        setRoute(url);
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [route, router.events, setPage]);

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
