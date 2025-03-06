"use client";

import { TagTypes, TagTypesTranslated } from "@/enum/TagTypes";
import { ITagCreateForm } from "@/interfaces/ITag";
import { Checkbox, ColorPicker, Form, FormInstance, Input, Select } from "antd";
import React from "react";

interface TagFormProps {
  form: FormInstance<ITagCreateForm>;
}

const TagForm: React.FC<TagFormProps> = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item<ITagCreateForm>
        name="is_active"
        valuePropName="checked"
        initialValue={true}
      >
        <Checkbox>Ativo</Checkbox>
      </Form.Item>

      <Form.Item<ITagCreateForm>
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<ITagCreateForm>
        label="Cor"
        name="color"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <ColorPicker showText />
      </Form.Item>

      <Form.Item<ITagCreateForm>
        label="Tipo"
        name="type"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Select
          placeholder="Selecione um tipo"
          options={Object.values(TagTypes).map(type => ({
            label: TagTypesTranslated[type],
            value: type,
          }))}
        />
      </Form.Item>
    </Form>
  );
};

export default React.memo(TagForm);
