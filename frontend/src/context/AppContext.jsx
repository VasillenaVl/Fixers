import { createContext, useEffect, useState } from "react";
{
  /*import { professionals } from "../assets/assets";*/
}
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "BGN";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [professionals, setProfessionals] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const getFixersData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/professional/list");
      if (data.success) {
        setProfessionals(data.professionals);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    professionals,
    getFixersData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    {
      /* useEffect в този случай се използва, за да извика getFixersData() веднага след първото рендиране на компонента. Това гарантира, че списъкът с професионалисти (professionals) се зарежда от бекенда автоматично при стартиране на приложението.
       Ако дадем празен масив [] като втори аргумент, useEffect ще се изпълни само веднъж при първото рендиране на компонента.
    */
    }
    getFixersData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
// createContext: Създава контекст за споделяне на данни между компонентите без нужда от пробиване на пропсове (prop drilling).
// AppContext.Provider: Обвива компонентите, които ще имат достъп до стойността на контекста (value).

export default AppContextProvider;
