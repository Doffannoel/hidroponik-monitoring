"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAccessToken, clearTokens, apiLogout } from "./api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  /** Call after login to update context state */
  onLoginSuccess: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  logout: async () => {},
  onLoginSuccess: () => {},
});

const PUBLIC_PATHS = ["/", "/auth/sign-in", "/auth/sign-up"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check token on mount
  useEffect(() => {
    const token = getAccessToken();
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  // Redirect logic
  useEffect(() => {
    if (isLoading) return;

    const isPublicPath = PUBLIC_PATHS.some(
      (p) => pathname === p || pathname.startsWith("/auth/")
    );

    if (!isAuthenticated && !isPublicPath) {
      router.push("/auth/sign-in");
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // Even if API call fails, clear local tokens
      clearTokens();
    }
    setIsAuthenticated(false);
    router.push("/auth/sign-in");
  }, [router]);

  const onLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, logout, onLoginSuccess }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
