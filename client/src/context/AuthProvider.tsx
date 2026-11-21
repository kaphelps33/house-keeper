import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [auth, setAuth] = useState({});
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("jwt")
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
