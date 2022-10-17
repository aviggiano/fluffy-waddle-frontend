import { Container, Content, Icons, Pages } from "./styles";

import Left from "../../public/images/left.svg";
import Right from "../../public/images/right.svg";
import { useContext } from "react";
import PaginationContext from "../../contexts/Pagination";
import { useRouter } from "next/router";

const Pagination: React.FC = () => {
  const { page, setPage } = useContext(PaginationContext);
  const router = useRouter();
  const refreshData = (newPage: number) => {
    router.push({
      pathname: router.asPath.replace(/\?.*/, ""),
      query: { from: 10 * (newPage - 1), to: 10 * newPage },
    });
    setPage(newPage);
  };

  return (
    <Container>
      <Content>
        <Pages>Page {page} of ...</Pages>
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
