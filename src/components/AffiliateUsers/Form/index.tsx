"use client";

import { Checkbox, Form, FormInstance, Input } from "antd";
import React, { useCallback } from "react";
import { IAffiliateCreate } from "@/interfaces/IAffiliate";
import Masks from "@/utils/masks";

interface AffiliateFormProps {
  form: FormInstance<IAffiliateCreate>;
  isEditing?: boolean;
}

const AffiliateForm: React.FC<AffiliateFormProps> = ({
  form,
  isEditing = false,
}) => {
  const handleDocumentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const maskedValue =
        value.length <= 14 ? Masks.cpf(value) : Masks.cnpj(value);
      form.setFieldsValue({ document: maskedValue });
    },
    [form]
  );

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const maskedValue = Masks.phone(value);
      form.setFieldsValue({ phone: maskedValue });
    },
    [form]
  );

  return (
    <Form requiredMark={false} form={form} layout="vertical">
      <Form.Item name="is_active" valuePropName="checked" initialValue={true}>
        <Checkbox>Ativo</Checkbox>
      </Form.Item>

      <Form.Item
        label="Nome:"
        name="name"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Documento:"
        name="document"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input onChange={handleDocumentChange} />
      </Form.Item>

      <Form.Item
        label="Email:"
        name="email"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Telefone:"
        name="phone"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input onChange={handlePhoneChange} />
      </Form.Item>
      <Form.Item
        label="Observação:"
        name="observation"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default React.memo(AffiliateForm);
