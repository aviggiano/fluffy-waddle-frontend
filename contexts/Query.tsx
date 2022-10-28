import { useRouter } from "next/router";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { queryTypes, useQueryStates } from "next-usequerystate";

interface Query {
  from?: number;
  to?: number;

  search: string;

  check: string[];
  confidence: string[];
  impact: string[];
}

interface IQuery {
  query: Query;
  setQuery: (query: Query) => void;

  clearFilters: () => void;
  hasFilters: boolean;
}

export const PAGINATION_MIN = 10;
export const PAGINATION_MAX = 100;

const QueryContext = createContext<IQuery>({} as IQuery);

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const [query, setQuery] = useQueryStates({
    from: queryTypes.integer.withDefault(0),
    to: queryTypes.integer.withDefault(PAGINATION_MIN),
    search: queryTypes.string.withDefault(""),
    check: queryTypes.array(queryTypes.string).withDefault([]),
    confidence: queryTypes.array(queryTypes.string).withDefault([]),
    impact: queryTypes.array(queryTypes.string).withDefault([]),
  });

  const [route] = useState(router.asPath);

  const clearFilters = useCallback(() => {
    setQuery({
      from: 0,
      to: PAGINATION_MIN,
      search: null,
      check: [],
      confidence: [],
      impact: [],
    });
  }, [setQuery]);

  const hasFilters =
    query.check.length > 0 ||
    query.confidence.length > 0 ||
    query.impact.length > 0 ||
    query.search.length > 0;

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     const newRoute = url.replace(/\?.*/, "");
  //     if (newRoute !== route) {
  //       console.log({ url, route, newRoute });
  //       clearFilters();
  //     }
  //   };
  //   router.events.on("routeChangeStart", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, [route, router.events, clearFilters]);

  return (
    <QueryContext.Provider
      value={{
        query,
        setQuery,
        clearFilters,
        hasFilters,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export default QueryContext;
