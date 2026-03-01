"use client";
import { env } from "@/config/env";
import { AuthContextType, User } from "@/interfaces";
import api from "@/lib/axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserAPI = env.usersApi

const AuthContext = createContext<AuthContextType | undefined>({ user: undefined, loading: true });

export const AuthProvider = ({ children, initialUser, token }: { children: React.ReactNode, initialUser?: User, token?: boolean}) => {
  const [user, setUser] = useState<User | undefined>(initialUser);

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      if(token){
        const res = await api.get(`${UserAPI}/me/`);
        setUser(res.data);
      }
    } catch {
      setUser(undefined);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
      setLoading(false);
    }
  }, [initialUser]);

  useEffect(() => {
    // Only fetch if we don't have an initial user from the server
    if (!initialUser) {
      fetchUser();
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