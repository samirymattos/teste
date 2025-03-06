"use client";

import PageTitle from "@/components/PageTitle";
import { Button, Form, notification, Spin } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { courseService } from "@/services/course.service";
import { useParams, useRouter } from "next/navigation";
import { ICourseCreate } from "@/interfaces/ICourse";
import { useCourse } from "@/hooks/useCourse";
import CourseForm from "../Form";
import SectionSeparator from "@/components/MiniComponents/SectionSeparator";
import ProfileStructure from "@/components/ProfileStructure";

const CourseEdit: React.FC = () => {
  const [form] = Form.useForm<ICourseCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { course, courseLoading } = useCourse(
    useMemo(
      () => ({
        id,
      }),
      []
    )
  );

  useEffect(() => {
    if (course?.id) {
      form.setFieldsValue({
        name: course.name,
        description: course.description,
        cost_value: course.cost_value,
        sale_value: course.sale_value,
        workload: course.workload,
        modality: course.modality,
        is_active: course.is_active,
        is_supplier_priority: course.is_supplier_priority,
        is_enable_website: course.is_enable_website,
        is_enable_to_affiliate_consultant: course.is_enable_to_affiliate_consultant,
        cost_affiliate_consultant: course.cost_affiliate_consultant,
        percentage_discount_cash: course.percentage_discount_cash,
        percentage_discount_installments: course.percentage_discount_installments,
        document_delivery_time: course.document_delivery_time,
        requirements: course.requirements,
        observation: course.observation,
        hidden_observation: course.hidden_observation,
        affiliate_consultant_observation: course.affiliate_consultant_observation,
        course_category_id: course.course_category_id,
        supplier_id: course.supplier_id,
        // course_documentations: Array.isArray(course.course_documentations)
        //   ? course.course_documentations.map(
        //       (doc: { default_documentation_id: string }) => doc.default_documentation_id
        //     )
        //   : [],
      });
    }
  }, [course]);

  const submitData = useCallback(() => {
    if (isLoading || !course?.id) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      const dataToUpdate = {
        name: values.name,
        description: values.description,
        cost_value: values.cost_value,
        sale_value: values.sale_value,
        workload: values.workload,
        modality: values.modality,
        is_active: values.is_active,
        is_supplier_priority: values.is_supplier_priority,
        is_enable_website: values.is_enable_website,
        is_enable_to_affiliate_consultant: values.is_enable_to_affiliate_consultant,
        cost_affiliate_consultant: values.cost_affiliate_consultant,
        percentage_discount_cash: values.percentage_discount_cash,
        percentage_discount_installments: values.percentage_discount_installments,
        document_delivery_time: values.document_delivery_time,
        requirements: values.requirements,
        observation: values.observation,
        hidden_observation: values.hidden_observation,
        affiliate_consultant_observation: values.affiliate_consultant_observation,
        course_category_id: values.course_category_id,
        supplier_id: values.supplier_id,
        // course_documentations: Array.isArray(values.course_documentations)
        //   ? values.course_documentations.map(
        //       (doc: { type?: string; default_documentation_id: string }) => ({
        //         type: doc.type || "required",
        //         default_documentation_id: doc.default_documentation_id,
        //       })
        //     )
        //   : [],
      };

      courseService
        .update(course.id, dataToUpdate)
        .then(() => {
          notification.success({
            message: "Curso atualizado com sucesso!",
          });
          router.back();
        })
        .catch(() => {
          notification.error({
            message: "Erro ao atualizar curso",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, course]);

  return (
    <div className="w-7xl container mx-auto">
      <ProfileStructure
        isLoading={courseLoading}
        navTitle="Sistema >"
        title="Editar Curso"
        menuButtons={[
          {
            title: "Informações",
            link: `/dashboard/cursos/${id}/editar`,
            isActive: true,
          },
        ]}
      >
        <SectionSeparator title="Geral" />
        <div className="container-conteudo-small mb-4">
          <CourseForm form={form} isEditing />
          <Button type="primary" className="mt-4" onClick={submitData}>
            {isLoading ? "Carregando..." : "Salvar"}
          </Button>
        </div>
      </ProfileStructure>
    </div>
  );
};

export default React.memo(CourseEdit);
