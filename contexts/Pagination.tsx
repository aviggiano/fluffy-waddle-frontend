import React, { createContext, PropsWithChildren, useState } from "react";

interface Pagination {
  page: number;
  setPage: (page: number) => void;
}

const PaginationContext = createContext<Pagination>({} as Pagination);

export const PaginationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [page, setPage] = useState(1);

  return (
    <PaginationContext.Provider value={{ page, setPage }}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationContext;
