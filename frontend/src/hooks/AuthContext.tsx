import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axiosClient from "../services/axios-client";

const authContext = React.createContext(null);

export function AuthContext({children}) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    const mUser = cookies.get("user");
    if (!mUser) {
    } else {
      setUser(mUser);
    }
  }, []);

  const login = async (formData) => {
    await axiosClient
      .post("/user/login", formData)
      .then(function (response) {
        const res = response.data;
        res.type = formData.type;

        setUser(res);
        cookies.set("user", JSON.stringify(res), {
          path: "/",
          maxAge: 2592000,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logout = () => {
    cookies.remove("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useUser() {
  return useContext(authContext);
}