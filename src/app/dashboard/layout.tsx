"use client";

import React, { useEffect, useState } from "react";
import { Layout, notification, Spin } from "antd";
import Internal from "@/components/Header/Internal";
import { useSessionStore } from "@/context/session.context";
import { useRouter } from "next/navigation";
import { useCompanyStore } from "@/context/company.context";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { sessionRecovery } = useSessionStore();
  const { companyRecovery } = useCompanyStore();

  useEffect(() => {
    const start = async () => {
      const recovery = await sessionRecovery();
      await companyRecovery();
      if (recovery) {
        setIsLoading(false);
      } else {
        notification.error({
          message: "Sessão expirada, faça login novamente",
        });
        router.push("/");
      }
    };
    start();
  }, [router, sessionRecovery, companyRecovery]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout>
      <Internal />
      {children}
    </Layout>
  );
}
