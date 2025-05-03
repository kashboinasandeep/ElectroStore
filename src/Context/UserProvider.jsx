import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import {
  doLoginLocalStorage,
  doLogoutFromLocalStorage,
  getDataFromLocalStorage,
  isLoggedIn,
  isAdminUser as adminUser,
} from "../Auth/HelperAuth";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true); // new loading state

  useEffect(() => {
    const data = getDataFromLocalStorage();
    setIsLogin(isLoggedIn());
    setIsAdminUser(adminUser());
    setUserData(data);
    setLoading(false); // loading done
  }, []);

  const doLogin = (data) => {
    doLoginLocalStorage(data);
    setIsLogin(true);
    setIsAdminUser(adminUser());
    setUserData(getDataFromLocalStorage());
  };

  const doLogOut = () => {
    doLogoutFromLocalStorage();
    setIsLogin(false);
    setIsAdminUser(false);
    setUserData(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isLogin,
        isAdminUser,
        setIsLogin,
        login: doLogin,
        logout: doLogOut,
        loading, // added to context
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
