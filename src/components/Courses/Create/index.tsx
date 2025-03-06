"use client";

import PageTitle from "@/components/PageTitle";
import { Button, Form, notification } from "antd";
import React, { useCallback, useState } from "react";
import { courseService } from "@/services/course.service";
import { useRouter } from "next/navigation";
import { ICourseCreate } from "@/interfaces/ICourse";
import CourseForm from "../Form";

const CourseCreate: React.FC = () => {
  const [form] = Form.useForm<ICourseCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitData = useCallback(() => {
    if (isLoading) return;
    form.validateFields().then(values => {
  
      setIsLoading(true);
      courseService
        .create({
            ...values,
            modality: values.modality,
            course_documentations: values.course_documentations?.map(docId => ({
            type: "required",
            default_documentation_id: String(docId),
            })) || [],
        })
        .then(() => {
          notification.success({
            message: "Curso cadastrado com sucesso!",
          });
          router.back();
        })
        .catch(e => {
          notification.error({
            message: "Erro ao cadastrar Curso",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading]);
  

  return (
    <div className="w-7xl container mx-auto">
      <PageTitle navTitle="Sistema >" title="Cadastrar Curso" />
      <div className="container-conteudo">
        <CourseForm form={form} />
        <Button type="primary" className="mt-4" onClick={submitData}>
          {isLoading ? "Carregando..." : "Cadastrar"}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(CourseCreate);