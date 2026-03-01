"use client";
import { env } from "@/config/env";
import { AuthContextType, User } from "@/interfaces";
import api from "@/lib/axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserAPI = env.usersApi

const AuthContext = createContext<AuthContextType | undefined>({ user: undefined, loading: true });

export const AuthProvider = ({ children, initialUser }: { children: React.ReactNode, initialUser?: User}) => {
  const [user, setUser] = useState<User | undefined>(initialUser);

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get(`${UserAPI}/me/`);
      setUser(res.data);
    } catch {
      setUser(undefined);
    }
    setLoading(false);
  };


  useEffect(() => {
    if (!initialUser) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};