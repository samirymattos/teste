"use client";

import { Checkbox, Form, FormInstance, Input } from "antd";
import React from "react";
import { ISupplierCreate } from "@/interfaces/ISuppliers";

interface SupplierFormProps {
  form: FormInstance<ISupplierCreate>;
  isEditing?: boolean;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ form, isEditing = false }) => {
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
        <Input />
      </Form.Item>

      <Form.Item
        label="Chave OS:"
        name="os_key"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="E-mail:"
        name="email"
        rules={[{ required: true, message: "Campo obrigatório" }, { type: "email", message: "E-mail inválido" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Telefone:"
        name="phone"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Observação:" name="observation">
        <Input.TextArea rows={3} />
      </Form.Item>
    </Form>
  );
};

export default React.memo(SupplierForm);
