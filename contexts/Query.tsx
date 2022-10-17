import React, { createContext, PropsWithChildren, useState } from "react";

interface Query {
  from?: number;
  to?: number;
  search?: string;
  setFrom: (from: number) => void;
  setTo: (to: number) => void;
  setSearch: (search: string) => void;
}

export const PAGINATION_MIN = 10;
export const PAGINATION_MAX = 100;

const QueryContext = createContext<Query>({} as Query);

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(PAGINATION_MIN);
  const [search, setSearch] = useState<string | undefined>();

  return (
    <QueryContext.Provider
      value={{ from, setFrom, to, setTo, search, setSearch }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export default QueryContext;
