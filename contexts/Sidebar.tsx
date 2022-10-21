import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import pageWidth from "../styles/pageWidth";

interface Sidebar {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const SidebarContext = createContext<Sidebar>({} as Sidebar);

export const SidebarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(screen.width > pageWidth.phone);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
