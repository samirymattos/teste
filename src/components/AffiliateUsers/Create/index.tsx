"use client";

import PageTitle from "@/components/PageTitle";
import { Button, Form, notification } from "antd";
import React, { useCallback, useState } from "react";
import { affiliateService } from "@/services/affiliate.service";
import { useRouter } from "next/navigation";
import { IAffiliateCreate } from "@/interfaces/IAffiliate";
import AffiliateForm from "../Form";

const AffiliateCreate: React.FC = () => {
  const [form] = Form.useForm<IAffiliateCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitData = useCallback(() => {
    if (isLoading) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      affiliateService
        .create({
          name: values.name,
          document: values.document,
          is_active: values.is_active,
          email: values.email,
          phone: values.phone,
          observation: values.observation,
        })
        .then(() => {
          notification.success({
            message: "Captador cadastrado com sucesso!",
          });
          router.back();
        })
        .catch(e => {
          notification.error({
            message: "Erro ao cadastrar Captador",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading]);

  return (
    <div className="w-7xl container mx-auto">
      <PageTitle navTitle="Sistema >" title="Cadastrar Captador" />
      <div className="container-conteudo">
        <AffiliateForm form={form} />
        <Button type="primary" className="mt-4" onClick={submitData}>
          {isLoading ? "Carregando..." : "Cadastrar"}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(AffiliateCreate);
