"use client";

import PageTitle from "@/components/PageTitle";
import { Button, Form, notification } from "antd";
import React, { useCallback, useState } from "react";
import { supplierService } from "@/services/suppliers.service";
import { useRouter } from "next/navigation";
import { ISupplierCreate } from "@/interfaces/ISuppliers";
import SupplierForm from "../Form";

const SupplierCreate: React.FC = () => {
  const [form] = Form.useForm<ISupplierCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitData = useCallback(() => {
    if (isLoading) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      supplierService
        .create({
          ...values,
        })
        .then(() => {
          notification.success({
            message: "Fornecedor cadastrado com sucesso!",
          });
          router.back();
        })
        .catch(() => {
          notification.error({
            message: "Erro ao cadastrar Fornecedor",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading]);

  return (
    <div className="w-7xl container mx-auto">
      <PageTitle navTitle="Sistema >" title="Cadastrar Fornecedor" />
      <div className="container-conteudo">
        <SupplierForm form={form} />
        <Button type="primary" className="mt-4" onClick={submitData}>
          {isLoading ? "Carregando..." : "Cadastrar"}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SupplierCreate);
