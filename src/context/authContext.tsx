"use client";
import { fetchMe } from "@/hooks/users/useUsers";
import { AuthContextType, AuthProviderType } from "@/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext<AuthContextType | undefined>({ loading: true });

export const AuthProvider = ({ children, initialUser, token }: AuthProviderType) => {
    const [loading, setLoading] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    const init = async () => {
      try {
        if (token) {
          await queryClient.prefetchQuery({
            queryKey: ["me"],
            queryFn: fetchMe,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token]);

  return (
    <AuthContext.Provider value={{ loading }}>
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