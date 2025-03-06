"use client";

import PageTitle from '@/components/PageTitle';
import { IUserCreate } from '@/interfaces/IUser';
import { Button, Form, notification } from 'antd';
import React, { useCallback, useState } from 'react';
import UserForm from '../Form';
import { userService } from '@/services/user.service';
import { useRouter } from 'next/navigation';
import SectionSeparator from '@/components/MiniComponents/SectionSeparator';
const UserCreate: React.FC = () => {
  const [form] = Form.useForm<IUserCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitData = useCallback(() => {
    if (isLoading) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      userService
        .create({
          name: values.name,
          email: values.email,
          password: values.password,
          is_active: values.is_active,
          role: values.role,
        })
        .then(res => {
          notification.success({
            message: "Colaborador cadastrado com sucesso!",
          });
          router.push(
            `/dashboard/configuracoes/colaboradores/${res.data.user.id}/editar`
          );
        })
        .catch(() => {
          notification.error({
            message: "Erro ao cadastrar colaborador",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading]);

  return (
    <div className="w-7xl container mx-auto">
      <PageTitle navTitle="Sistema >" title="Cadastrar Colaborador" />
      <div className="container-conteudo">
        <UserForm form={form} />
        <Button type="primary" className="mt-4" onClick={submitData}>
          {isLoading ? "Carregando..." : "Cadastrar"}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(UserCreate);
