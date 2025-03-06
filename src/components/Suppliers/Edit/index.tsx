"use client";

import PageTitle from "@/components/PageTitle";
import { Button, Form, notification, Spin } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { supplierService } from "@/services/suppliers.service";
import { useParams, useRouter } from "next/navigation";
import { ISupplierCreate } from "@/interfaces/ISuppliers";
import { useSupplier } from "@/hooks/useSupplier";
import SupplierForm from "../Form";
import SectionSeparator from "@/components/MiniComponents/SectionSeparator";
import ProfileStructure from "@/components/ProfileStructure";

const SupplierEdit: React.FC = () => {
  const [form] = Form.useForm<ISupplierCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { supplier, supplierLoading } = useSupplier(
    useMemo(
      () => ({
        id,
      }),
      []
    )
  );

  useEffect(() => {
    if (supplier?.id) {
      form.setFieldsValue({
        name: supplier.name,
        document: supplier.document,
        os_key: supplier.os_key,
        email: supplier.email,
        phone: supplier.phone,
        observation: supplier.observation,
        is_active: supplier.is_active,
      });
    }
  }, [supplier]);

  const submitData = useCallback(() => {
    if (isLoading || !supplier?.id) return;
    form.validateFields().then(values => {
      setIsLoading(true);
  
      const dataToUpdate: ISupplierCreate = {
        name: values.name,
        document: values.document, // <-- Aqui, garantimos que o `document` está incluído
        os_key: values.os_key,
        email: values.email,
        phone: values.phone,
        observation: values.observation,
        is_active: values.is_active,
      };
  
      supplierService
        .update(supplier.id, dataToUpdate)
        .then(() => {
          notification.success({
            message: "Fornecedor atualizado com sucesso!",
          });
          router.back();
        })
        .catch(() => {
          notification.error({
            message: "Erro ao atualizar Fornecedor",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, supplier]);
  

  return (
    <div className="w-7xl container mx-auto">
      <ProfileStructure
        isLoading={supplierLoading}
        navTitle="Sistema >"
        title="Editar Fornecedor"
        menuButtons={[
          {
            title: "Informações",
            link: `/dashboard/fornecedores/${id}/editar`,
            isActive: true,
          },
        ]}
      >
        <SectionSeparator title="Geral" />
        <div className="container-conteudo-small mb-4">
          <SupplierForm form={form} isEditing />
          <Button type="primary" className="mt-4" onClick={submitData}>
            {isLoading ? "Carregando..." : "Salvar"}
          </Button>
        </div>
      </ProfileStructure>
    </div>
  );
};

export default React.memo(SupplierEdit);
