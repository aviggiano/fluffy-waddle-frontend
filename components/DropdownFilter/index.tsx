import { Button, Container, Content, DropdownContent } from "./styles";

import Filter from "../../public/images/filter.svg";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Confidence, Impact } from "../Table/styles";
import { useRouter } from "next/router";
import QueryContext from "../../contexts/Query";

function onClickOutside(ref: MutableRefObject<null>, fn: () => void) {}

interface Props {
  filter: string;
  name: string;
  values: string[];
}

const DropdownFilter: React.FC<Props> = ({ filter, name, values }: Props) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const query = useContext(QueryContext);
  const f = ((query as any)[filter] || [])
    .map((e: string) => ({ [e]: true }))
    .reduce(
      (a: Record<string, boolean>, b: Record<string, boolean>) => ({
        ...a,
        ...b,
      }),
      {}
    );
  const [filters, setFilters] = useState<Record<string, boolean>>(f);
  onClickOutside(ref, () => setIsOpen(!isOpen));

  const context = useContext(QueryContext);
  const setter = (context as any)[`set${name}`];
  const router = useRouter();

  const setFilter = (value: string) => {
    const newFilters = {
      ...filters,
      [value]: !filters[value],
    };
    const query = Object.keys(newFilters).filter((e) => newFilters[e]);

    setFilters(newFilters);
    setter(query);

    const route = router.asPath.replace(/\?.*/, "");
    router.push({
      pathname: route,
      query: {
        ...router.query,
        [filter]: query.join(","),
      },
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
