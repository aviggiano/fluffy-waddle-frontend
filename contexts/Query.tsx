import React, { createContext, PropsWithChildren, useState } from "react";

interface Query {
  page: number;
  search?: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
}

const QueryContext = createContext<Query>({} as Query);

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | undefined>();

  return (
    <QueryContext.Provider value={{ page, setPage, search, setSearch }}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryContext;
