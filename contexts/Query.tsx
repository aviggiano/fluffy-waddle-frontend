import { useRouter } from "next/router";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

interface Query {
  from?: number;
  to?: number;
  search?: string;

  check: string[];
  confidence: string[];
  impact: string[];

  setFrom: (from: number) => void;
  setTo: (to: number) => void;
  setSearch: (search: string) => void;

  setCheck: (check: string[]) => void;
  setConfidence: (confidence: string[]) => void;
  setImpact: (impact: string[]) => void;
}

export const PAGINATION_MIN = 10;
export const PAGINATION_MAX = 100;

const QueryContext = createContext<Query>({} as Query);

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(PAGINATION_MIN);
  const [search, setSearch] = useState<string | undefined>();
  const [check, setCheck] = useState<string[]>(
    (router.query?.check as string)
      ? (router.query?.check as string).split(",")
      : []
  );
  const [confidence, setConfidence] = useState<string[]>(
    (router.query?.confidence as string)
      ? (router.query?.confidence as string).split(",")
      : []
  );
  const [impact, setImpact] = useState<string[]>(
    (router.query?.impact as string)
      ? (router.query?.impact as string).split(",")
      : []
  );

  const [route, setRoute] = useState(router.asPath);

  console.log(router.query);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log({ url, route });
      const newRoute = url.replace(/\?.*/, "");
      if (newRoute !== route) {
        setFrom(0);
        setTo(PAGINATION_MIN);
        setSearch(undefined);
        setCheck([]);
        setConfidence([]);
        setImpact([]);
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [route, router.events, setFrom, setTo]);

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
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export default QueryContext;
