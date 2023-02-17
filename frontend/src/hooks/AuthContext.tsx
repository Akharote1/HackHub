import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axiosClient from "../services/axios-client";

const AuthContext = React.createContext(null);

export function AuthProvider({children}) {
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
    const response = await axiosClient
      .post("/user/login", formData);
    const res = response.data;

    console.log(res.user)

    setUser(res.user);
    cookies.set("token", res.token);
    cookies.set("user", JSON.stringify(res.user));
  };

  const logout = () => {
    cookies.remove("user");
    cookies.remove("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  return useContext(AuthContext);
}