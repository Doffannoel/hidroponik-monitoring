"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { apiGoogleLogin } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function SocialGoogleButton() {
  const [loading, setLoading] = useState(false);
  const { onLoginSuccess } = useAuth();
  const router = useRouter();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      if (credentialResponse.credential) {
        await apiGoogleLogin(credentialResponse.credential);
        onLoginSuccess();
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Google login failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-14 w-full items-center justify-center overflow-hidden rounded-full border border-[#dde2d8] bg-white transition hover:bg-[#f3f6f0]">
      {loading ? (
        <span className="text-sm font-semibold text-[#243021]">Memproses...</span>
      ) : (
        <div className="w-full h-full flex items-center justify-center scale-110">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.error("Google Login Failed");
            }}
            useOneTap
            shape="pill"
            theme="outline"
            size="large"
            text="continue_with"
            width="100%"
          />
        </div>
      )}
    </div>
  );
}
