"use client";

import PageTitle from "@/components/PageTitle";
import { Button, Form, notification, Spin } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { affiliateService } from "@/services/affiliate.service";
import { useParams, useRouter } from "next/navigation";
import { IAffiliateCreate } from "@/interfaces/IAffiliate";
import { useAffiliate } from "@/hooks/useAffiliate";
import AffiliateUserForm from "../Form";
import SectionSeparator from "@/components/MiniComponents/SectionSeparator";
import AddressList from "@/components/Address/List";
import ProfileStructure from "@/components/ProfileStructure";

const AffiliateEdit: React.FC = () => {
  const [form] = Form.useForm<IAffiliateCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { affiliate, affiliateLoading } = useAffiliate(
    useMemo(
      () => ({
        id,
      }),
      []
    )
  );

  useEffect(() => {
    if (affiliate?.id) {
      form.setFieldsValue({
        name: affiliate.name,
        document: affiliate.document,
        email: affiliate.email,
        phone: affiliate.phone,
        observation: affiliate.observation,
        is_active: affiliate.is_active,
      });
    }
  }, [affiliate]);

  const submitData = useCallback(() => {
    if (isLoading || !affiliate?.id) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      const dataToUpdate = {
        name: values.name,
        document: values.document,
        email: values.email,
        phone: values.phone,
        observation: values.observation,
        is_active: values.is_active,
      };

      affiliateService
        .update(affiliate.id, dataToUpdate)
        .then(() => {
          notification.success({
            message: "Captador atualizado com sucesso!",
          });
          router.back();
        })
        .catch(() => {
          notification.error({
            message: "Erro ao atualizar Captador",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, affiliate]);

  return (
    <div className="w-7xl container mx-auto">
      <ProfileStructure
        isLoading={affiliateLoading}
        navTitle="Sistema >"
        title="Editar Captador"
        menuButtons={[
          {
            title: "Informações",
            link: `/dashboard/configuracoes/captadores/${id}/editar`,
            isActive: false,
          },
          {
            title: "Acordos",
            link: `/dashboard/configuracoes/captadores/${id}/acordos`,
            isActive: true,
          },
        ]}
      >
        <SectionSeparator title="Geral" />
        <div className="container-conteudo-small mb-4">
          <AffiliateUserForm form={form} isEditing />
          <Button type="primary" className="mt-4" onClick={submitData}>
            {isLoading ? "Carregando..." : "Salvar"}
          </Button>
        </div>
        <SectionSeparator title="Endereços" />
        <div className="container-conteudo-small mb-4">
          <AddressList field={"affiliate_consultant_id"} value={id} />
        </div>
      </ProfileStructure>
    </div>
  );
};

export default React.memo(AffiliateEdit);
