import { Button, Container, Content, DropdownContent } from "./styles";

import Filter from "../../public/images/filter.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { Confidence, Impact } from "../Table/styles";
import QueryContext from "../../contexts/Query";

interface Props {
  filter: string;
  label: string;
  values: string[];
}

const DropdownFilter: React.FC<Props> = ({ filter, label, values }: Props) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(QueryContext);
  const { query, setQuery } = context;
  const filtersArray = (query as unknown as Record<string, string[]>)[filter];
  const filtersMap = (filtersArray || [])
    .map((e: string) => ({ [e]: true }))
    .reduce(
      (a: Record<string, boolean>, b: Record<string, boolean>) => ({
        ...a,
        ...b,
      }),
      {}
    );
  const [filters, setFilters] = useState<Record<string, boolean>>(filtersMap);

  const setFilter = (value: string) => {
    const newFilters = {
      ...filters,
      [value]: !filters[value],
    };
    const array = Object.keys(newFilters).filter((e) => newFilters[e]);
    setFilters(newFilters);
    setQuery({
      ...query,
      [filter]: array,
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsOpen, isOpen]);

  return (
    <Container ref={ref}>
      <Content>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Filter />
          <div>{label}</div>
        </button>
      </Content>
      <DropdownContent n={values.length} isOpen={isOpen}>
        {values.map((value) => (
          <Button
            filtered={filters[value]}
            key={value}
            onClick={(e) => {
              e.preventDefault();
              setFilter(value);
            }}
          >
            {filter === "confidence" ? (
              <Confidence confidence={value}>{value}</Confidence>
            ) : filter === "impact" ? (
              <Impact impact={value}>{value}</Impact>
            ) : (
              <Impact impact={value}>{value}</Impact>
            )}
          </Button>
        ))}
      </DropdownContent>
    </Container>
  );
};

export default DropdownFilter;
