import { createContext, useState } from "react";
import type { Dispatch, JSX, SetStateAction } from "react";

interface AuthState {
  name?: string;
  username?: string;
  password?: string;
  accessToken?: string;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
}

const AuthContext = createContext<AuthContextType | null>({});

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
