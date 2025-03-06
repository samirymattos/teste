"use client";

import PageTitle from "@/components/PageTitle";
import { IUserCreate } from "@/interfaces/IUser";
import { Button, Form, notification, Spin } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserForm from "../Form";
import { userService } from "@/services/user.service";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import SectionSeparator from "@/components/MiniComponents/SectionSeparator";
import AddressList from "@/components/Address/List";
import ProfileStructure from "@/components/ProfileStructure";

const UserEdit: React.FC = () => {
  const [form] = Form.useForm<IUserCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { user, userLoading } = useUser(
    useMemo(
      () => ({
        id,
      }),
      []
    )
  );

  useEffect(() => {
    if (user?.id) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        is_active: user.is_active,
        role: user.role,
      });
    }
  }, [user]);

  const submitData = useCallback(() => {
    if (isLoading || !user?.id) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      const dataToUpdate = {
        name: values.name,
        email: values.email,
        is_active: values.is_active,
        role: values.role,
      };

      if (values.password) {
        Object.assign(dataToUpdate, { password: values.password });
      }

      userService
        .update(user.id, dataToUpdate)
        .then(() => {
          notification.success({
            message: "Colaborador atualizado com sucesso!",
          });
          router.back();
        })
        .catch(() => {
          notification.error({
            message: "Erro ao atualizar colaborador",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, user]);

  return (
    <div className="w-7xl container mx-auto">
      <ProfileStructure
        isLoading={userLoading}
        navTitle="Sistema >"
        title="Editar Colaborador"
        menuButtons={[
          {
            title: "Informações",
            link: `/dashboard/configuracoes/colaboradores/${id}/editar`,
            isActive: true,
          },
          {
            title: "Empresas vínculadas",
            link: `/dashboard/configuracoes/colaboradores/${id}/empresas`,
            isActive: false,
          },
        ]}
      >
        <SectionSeparator title="Geral" />
        <div className="container-conteudo-small mb-4">
          <UserForm form={form} isEditing />
          <Button type="primary" className="mt-4" onClick={submitData}>
            {isLoading ? "Carregando..." : "Salvar"}
          </Button>
        </div>
        <SectionSeparator title="Endereços" />
        <div className="container-conteudo-small mb-4">
          <AddressList field={"user_id"} value={id} />
        </div>
      </ProfileStructure>
    </div>
  );
};

export default React.memo(UserEdit);
