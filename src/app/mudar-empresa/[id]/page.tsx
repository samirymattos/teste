"use client";

import AppLoading from "@/components/AppLoading";
import { useCompanyStore } from "@/context/company.context";
import { useSessionStore } from "@/context/session.context";
import { sessionService } from "@/services/session.service";
import { notification } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Page: React.FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const search = useSearchParams();
  const name = search.get("name");
  const { sessionHandle } = useSessionStore();
  const { company, companyHandle } = useCompanyStore();

  useEffect(() => {
    sessionService
      .changeCompanyToken(id)
      .then(res => {
        sessionHandle(res.data);
        if (company && company.companies) {
          const selectedCompany = company?.companies.find(c => c.id === id);
          if (selectedCompany) {
            companyHandle({
              actual_company: selectedCompany,
              companies: company.companies,
            });
          }
        }
        router.push("/dashboard");
      })
      .catch(err => {
        notification.error({
          message: "Erro ao acessar empresa",
          description: err.message,
        });
      });
  }, [id, sessionHandle, router, company, companyHandle]);
  return <AppLoading message={`Acessando empresa: ${name}`} />;
};

export default React.memo(Page);
