"use client";

import { Checkbox, Form, FormInstance, Input, InputNumber, Select } from "antd";
import React from "react";
import { ICourseCreate } from "@/interfaces/ICourse";
import { useDefaultDocumentations } from "@/hooks/useDefaultDocumentations";
import { useCourseCategories } from "@/hooks/useCourseCategories";
import { useSuppliers } from "@/hooks/useSuppliers";
import { CourseTypes, CourseTypesTranslated } from "@/enum/CourseTypes";

interface CourseFormProps {
  form: FormInstance<ICourseCreate>;
  isEditing?: boolean;
}

const { Option } = Select;

const CourseForm: React.FC<CourseFormProps> = ({ form, isEditing = false }) => {
  const { defaultDocumentations, defaultDocumentationsLoading } = useDefaultDocumentations({});
  const { courseCategories, courseCategoriesLoading } = useCourseCategories({});
  const { suppliers, suppliersLoading } = useSuppliers({});

  return (
    <Form requiredMark={false} form={form} layout="vertical">
        <Form.Item name="is_active" valuePropName="checked" initialValue={true}>
            <Checkbox>Ativo</Checkbox>
        </Form.Item>
        
        <Form.Item name="is_supplier_priority" valuePropName="checked" initialValue={false}>
            <Checkbox>Prioridade do Fornecedor</Checkbox>
        </Form.Item>
        
        <Form.Item name="is_enable_website" valuePropName="checked" initialValue={false}>
            <Checkbox>Habilitar no Site</Checkbox>
        </Form.Item>
      
        <Form.Item name="is_enable_to_affiliate_consultant" valuePropName="checked" initialValue={false}>
            <Checkbox>Habilitar para Consultor Afiliado</Checkbox>
        </Form.Item>

        <Form.Item
            label="Nome:"
            name="name"
            rules={[{ required: true, message: "Campo obrigatório" }]}
        >
            <Input />
        </Form.Item>

        <Form.Item label="Descrição:" name="description">
            <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Requisitos:" name="requirements">
            <Input.TextArea rows={3} />
        </Form.Item>
        
        <Form.Item label="Observação:" name="observation">
            <Input.TextArea rows={3} />
        </Form.Item>
        
        <Form.Item label="Observação Oculta:" name="hidden_observation">
            <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
            label="Categoria do Curso:"
            name="course_category_id"
            rules={[{ required: true, message: "Campo obrigatório" }]}
        >
            <Select loading={courseCategoriesLoading}>
            {courseCategories.map(category => (
                <Option key={category.id} value={category.id}>{category.name}</Option>
            ))}
            </Select>
        </Form.Item>

        <Form.Item
            label="Fornecedor:"
            name="supplier_id"
            rules={[{ required: true, message: "Campo obrigatório" }]}
        >
            <Select loading={suppliersLoading}>
            {suppliers.map(supplier => (
                <Option key={supplier.id} value={supplier.id}>{supplier.name}</Option>
            ))}
            </Select>
        </Form.Item>

        <Form.Item
            label="Carga Horária:"
            name="workload"
            rules={[{ required: true, message: "Campo obrigatório" }]}
        >
            <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
            label="Custo:"
            name="cost_value"
            rules={[{ required: true, message: "Campo obrigatório" }]}
        >
            <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
            label="Custo para Consultor Afiliado:"
            name="cost_affiliate_consultant"
            rules={[{ required: true, message: "Campo obrigatório" }]}
        >
            <InputNumber min={0} className="w-full" />
        </Form.Item>
        
        <Form.Item label="Observação do Consultor Afiliado:" name="affiliate_consultant_observation">
            <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
            label="Valor de Venda:"
            name="sale_value"
            rules={[{ required: true, message: "Campo obrigatório" }]}
        >
            <InputNumber min={0} className="w-full" />
        </Form.Item>
        
        <Form.Item
            label="Desconto à Vista (%):"
            name="percentage_discount_cash"
            rules={[{ required: true, message: "Campo obrigatório" }]}
        >
            <InputNumber min={0} max={100} className="w-full" />
        </Form.Item>

        <Form.Item
            label="Desconto Parcelado (%):"
            name="percentage_discount_installments"
            rules={[{ required: true, message: "Campo obrigatório" }]}
        >
            <InputNumber min={0} max={100} className="w-full" />
        </Form.Item>

        <Form.Item
            label="Modalidade:"
            name="modality"
            rules={[{ required: true, message: "Campo obrigatório" }]}
        >
            <Select>
            {Object.values(CourseTypes).map(value => (
                <Option key={value} value={value}>{CourseTypesTranslated[value]}</Option>
            ))}
            </Select>
        </Form.Item>

        <Form.Item label="Documentações:" name="course_documentations">
            <Select mode="multiple" loading={defaultDocumentationsLoading}>
            {defaultDocumentations.map(doc => (
                <Option key={doc.id} value={doc.id}>{doc.name}</Option>
            ))}
            </Select>
        </Form.Item>

        <Form.Item
            label="Tempo de Entrega do Documento (dias):"
            name="document_delivery_time"
            rules={[{ required: true, message: "Campo obrigatório" }]}
        >
            <InputNumber min={0} className="w-full" />
        </Form.Item>
    </Form>
  );
};

export default React.memo(CourseForm);