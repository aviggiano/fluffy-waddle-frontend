import { Button, Container, Content, DropdownContent } from "./styles";

import Filter from "../../public/images/filter.svg";
import { useContext, useState } from "react";
import { Confidence, Impact } from "../Table/styles";
import { useRouter } from "next/router";
import QueryContext from "../../contexts/Query";

interface Props {
  filter: string;
  name: string;
  values: string[];
}

const DropdownFilter: React.FC<Props> = ({ filter, name, values }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, boolean>>({});

  const context = useContext(QueryContext);
  const setter = (context as any)[`set${name}`];
  const router = useRouter();

  const setFilter = (value: string) => {
    const newFilters = {
      ...filters,
      [value]: !filters[value],
    };
    setFilters(newFilters);
    const query = Object.keys(newFilters).filter((e) => newFilters[e]);

    const route = router.asPath.replace(/\?.*/, "");
    router.push({
      pathname: route,
      query: {
        ...router.query,
        [filter]: query.join(","),
      },
    });
    setter(query);
  };
  return (
    <Container>
      <Content>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Filter />
          <div>{name}</div>
        </button>
      </Content>
      <DropdownContent isOpen={isOpen}>
        {values.map((value) => (
          <Button
            filtered={filters[value]}
            key={value}
            onClick={() => setFilter(value)}
          >
            {filter === "confidence" ? (
              <Confidence confidence={value}>{value}</Confidence>
            ) : filter === "impact" ? (
              <Impact impact={value}>{value}</Impact>
            ) : (
              <div>{value}</div>
            )}
          </Button>
        ))}
      </DropdownContent>
    </Container>
  );
};

export default DropdownFilter;
