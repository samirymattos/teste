import External from "@/components/Header/External";
import { Layout } from "antd";
import React from "react";
//import '../';

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <External />
      {children}
    </Layout>
  );
}
