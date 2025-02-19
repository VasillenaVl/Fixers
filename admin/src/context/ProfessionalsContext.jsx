import { createContext } from "react";

export const ProfessionalsContext = createContext();
const ProfessionalsContextProvider = (props) => {
  const value = {};

  return (
    <ProfessionalsContext.Provider value={value}>
      {props.children}
    </ProfessionalsContext.Provider>
  );
};

export default ProfessionalsContextProvider;
