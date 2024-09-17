import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import Login from "../../components/Login";

const GLOBAL_CONTEXT = createContext();

export function ContextProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState("hello");
  const [contextToken, setContextToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setContextToken(null);
      router.replace("/");
    } else {
      setContextToken(token);
    }
  }, [router, contextToken]);

  const value = {
    user,
    setUser,
    contextToken,
    setContextToken,
  };
  return (
    <GLOBAL_CONTEXT.Provider value={value}>{children}</GLOBAL_CONTEXT.Provider>
  );
}

export default GLOBAL_CONTEXT;
