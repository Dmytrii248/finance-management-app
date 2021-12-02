import { createContext, useContext } from "react";
import { GlobalContextType } from "Constants/types";

export const GlobalContext = createContext<GlobalContextType>({
  recordCollection: null,
  tagCollection: null,
});

export const useGlobalContext = () => useContext(GlobalContext);
