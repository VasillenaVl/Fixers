import { createContext } from "react";
import { professionals } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "BGN";

  const value = {
    professionals,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
// createContext: Създава контекст за споделяне на данни между компонентите без нужда от пробиване на пропсове (prop drilling).
// AppContext.Provider: Обвива компонентите, които ще имат достъп до стойността на контекста (value).

export default AppContextProvider;
