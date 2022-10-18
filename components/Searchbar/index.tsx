import React, { ChangeEvent, useCallback, useContext } from "react";
import { Container, Content } from "./styles";

import Search from "../../public/images/search.svg";
import QueryContext from "../../contexts/Query";
import { useRouter } from "next/router";
import debounce from "../../services/debounce";

const Searchbar: React.FC = () => {
  const { search, setSearch } = useContext(QueryContext);
  const router = useRouter();

  const route = router.asPath.replace(/\?.*/, "");

  const debouncedRouterPush = useCallback(
    debounce((nextValue) =>
      router.push({
        pathname: route,
        query: {
          ...router.query,
          search: nextValue,
        },
      })
    ),
    [router, route]
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    debouncedRouterPush(newSearch as never);
  };

  return (
    <Container>
      <Content>
        <Search />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={onChange}
        />
      </Content>
    </Container>
  );
};

export default Searchbar;
