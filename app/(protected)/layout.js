"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UseAppContext } from "@/context/AppContext";

export default function ProtectedLayout({ children }) {
  const { authUser } = UseAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/LoginPage");
    }
  }, [authUser, router]);

  if (!authUser) {
   
    return null;
  }

  return <>{children}</>;
}
