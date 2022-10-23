import { useRouter } from "next/router";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { queryTypes, useQueryState } from "next-usequerystate";

interface Query {
  from?: number;
  to?: number;

  search: string;

  check: string[];
  confidence: string[];
  impact: string[];

  setFrom: (from: number) => void;
  setTo: (to: number) => void;
  setSearch: (search: string) => void;

  setCheck: (check: string[]) => void;
  setConfidence: (confidence: string[]) => void;
  setImpact: (impact: string[]) => void;

  clearFilters: () => void;
  hasFilters: boolean;
}

export const PAGINATION_MIN = 10;
export const PAGINATION_MAX = 100;

const QueryContext = createContext<Query>({} as Query);

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const [from, setFrom] = useQueryState(
    "from",
    queryTypes.integer.withDefault(0)
  );
  const [to, setTo] = useQueryState(
    "to",
    queryTypes.integer.withDefault(PAGINATION_MIN)
  );
  const [search, setSearch] = useQueryState<string>(
    "search",
    queryTypes.string.withDefault("")
  );
  const [check, setCheck] = useQueryState<string[]>(
    "check",
    queryTypes.array(queryTypes.string).withDefault([])
  );
  const [confidence, setConfidence] = useQueryState<string[]>(
    "check",
    queryTypes.array(queryTypes.string).withDefault([])
  );
  const [impact, setImpact] = useQueryState<string[]>(
    "impact",
    queryTypes.array(queryTypes.string).withDefault([])
  );

  const [route] = useState(router.asPath);

  const clearFilters = useCallback(() => {
    setFrom(0);
    setTo(PAGINATION_MIN);
    setSearch("");
    setCheck([]);
    setConfidence([]);
    setImpact([]);
  }, [setFrom, setTo, setSearch, setCheck, setConfidence, setImpact]);

  const hasFilters =
    check.length > 0 ||
    confidence.length > 0 ||
    impact.length > 0 ||
    search.length > 0;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const newRoute = url.replace(/\?.*/, "");
      if (newRoute !== route) {
        console.log({ url, route, newRoute });
        clearFilters();
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [route, router.events, clearFilters]);

  return (
    <QueryContext.Provider
      value={{
        from,
        setFrom,
        to,
        setTo,
        search,
        setSearch,
        check,
        setCheck,
        confidence,
        setConfidence,
        impact,
        setImpact,
        clearFilters,
        hasFilters,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export default QueryContext;
