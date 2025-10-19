import { createContext, useEffect, useState } from "react";
import * as localAuth from "../services/localAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = localAuth.onAuthStateChanged((u) => {
      setUser(u);
      if (u) console.log("AuthProvider (local): user signed in", u);
      else console.log("AuthProvider (local): no user signed in");
      setInitializing(false);
    });
    return () => unsub();
  }, []);

  const loginWithEmail = async (email, password) => {
    return localAuth.loginWithEmail(email, password);
  };

  const registerWithEmail = async (name, email, password) => {
    return localAuth.registerWithEmail(name, email, password);
  };

  const logout = async () => {
    return localAuth.logout();
  };

  const value = {
    user,
    initializing,
    loginWithEmail,
    registerWithEmail,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
