"use client";

import PageTitle from "@/components/PageTitle";
import { Button, Form, notification, Spin } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TagForm from "../Form";
import { useParams, useRouter } from "next/navigation";
import { saleStatusService } from "@/services/sale-status.service";
import { useTag } from "@/hooks/useTag";
import { ITagCreateForm } from "@/interfaces/ITag";
import { tagsService } from "@/services/tag.service";
import { Color } from "antd/es/color-picker";

const TagEdit: React.FC = () => {
  const [form] = Form.useForm<ITagCreateForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { tag, tagLoading } = useTag(
    useMemo(
      () => ({
        id,
      }),
      []
    )
  );

  useEffect(() => {
    if (tag?.id) {
      form.setFieldsValue({
        name: tag.name,
        color: tag.color,
        is_active: tag.is_active,
        type: tag.type,
      });
    }
  }, [tag]);

  const submitData = useCallback(() => {
    if (isLoading || !tag?.id) return;
    form.validateFields().then(values => {
      console.log({ values });
      setIsLoading(true);

      const dataToUpdate = {
        name: values.name,
        color:
          typeof values.color === "string"
            ? values.color
            : (values.color as Color)?.toHexString(),
        is_active: values.is_active,
        type: values.type,
      };

      tagsService
        .update(tag.id, dataToUpdate)
        .then(() => {
          notification.success({
            message: "Tag atualizado com sucesso!",
          });
          router.back();
        })
        .catch(() => {
          notification.error({
            message: "Erro ao atualizar tag",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, tag]);

  return (
    <div className="w-7xl container mx-auto">
      <PageTitle navTitle="Sistema >" title="Editar tag" />

      {tagLoading ? (
        <div className="flex items-center justify-center p-24">
          <Spin />
        </div>
      ) : (
        <div className="container-conteudo">
          <TagForm form={form} />
          <Button type="primary" className="mt-4" onClick={submitData}>
            {isLoading ? "Carregando..." : "Salvar"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(TagEdit);
