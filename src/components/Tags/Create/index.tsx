"use client";

import PageTitle from "@/components/PageTitle";
import { Button, Form, notification } from "antd";
import React, { useCallback, useState } from "react";
import TagForm from "../Form";
import { useRouter } from "next/navigation";
import { ITagCreateForm } from "@/interfaces/ITag";
import { tagsService } from "@/services/tag.service";

const TagCreate: React.FC = () => {
  const [form] = Form.useForm<ITagCreateForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitData = useCallback(() => {
    if (isLoading) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      tagsService
        .create({
          name: values.name,
          color: values.color.toHexString(),
          is_active: values.is_active,
          type: values.type,
        })
        .then(() => {
          notification.success({
            message: "Tag cadastrada com sucesso!",
          });
          router.back();
        })
        .catch(() => {
          notification.error({
            message: "Erro ao cadastrar tag",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading]);

  return (
    <div className="w-7xl container mx-auto">
      <PageTitle navTitle="Sistema >" title="Cadastrar Tag" />
      <div className="container-conteudo">
        <TagForm form={form} />
        <Button type="primary" className="mt-4" onClick={submitData}>
          {isLoading ? "Carregando..." : "Cadastrar"}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(TagCreate);
