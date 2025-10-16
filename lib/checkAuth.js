"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UseAppContext } from "@/context/AppContext";

export default function useCheckAuth() {
  const { authUser } = UseAppContext();
  const router = useRouter();

  useEffect(() => {
    if (authUser === null || authUser === undefined) {
      router.push("/LoginPage"); 
    }
  }, [authUser, router]);
}
