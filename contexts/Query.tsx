import React, { createContext, PropsWithChildren, useState } from "react";

interface Query {
  from?: number;
  to?: number;
  search?: string;
  confidence: string[];
  impact: string[];

  setFrom: (from: number) => void;
  setTo: (to: number) => void;
  setSearch: (search: string) => void;
  setConfidence: (confidence: string[]) => void;
  setImpact: (impact: string[]) => void;
}

export const PAGINATION_MIN = 10;
export const PAGINATION_MAX = 100;

const QueryContext = createContext<Query>({} as Query);

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(PAGINATION_MIN);
  const [search, setSearch] = useState<string | undefined>();
  const [confidence, setConfidence] = useState<string[]>([]);
  const [impact, setImpact] = useState<string[]>([]);

  return (
    <QueryContext.Provider
      value={{
        from,
        setFrom,
        to,
        setTo,
        search,
        setSearch,
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
