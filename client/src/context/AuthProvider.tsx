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
  persist: React.ComponentState;
  setPersist: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>({});

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")!) || false
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
