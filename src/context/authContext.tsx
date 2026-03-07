"use client";
import { env } from "@/config/env";
import { AuthContextType, AuthProviderType, User } from "@/interfaces";
import api from "@/lib/axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserAPI = env.usersApi

const AuthContext = createContext<AuthContextType | undefined>({ user: undefined, loading: true, setUser: () => {} });

export const AuthProvider = ({ children, initialUser, token }: AuthProviderType) => {
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
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
      setLoading(false);
    }
  }, [initialUser]);

  useEffect(() => {
    if (!initialUser) {
      setLoading(true)
      fetchUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
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