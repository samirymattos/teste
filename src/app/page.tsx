"use client";

import AppLoading from "@/components/AppLoading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/acessar");
    }, 2000);
  }, []);
  return <AppLoading />;
}
