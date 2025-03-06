"use client";

import { UserRoles, UserRolesTranslated } from "@/enum/UserRoles";
import { IUserCreate } from "@/interfaces/IUser";
import { Checkbox, Form, FormInstance, Input, Select } from "antd";
import React from "react";

interface UserFormProps {
  form: FormInstance<IUserCreate>;
  isEditing?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ form, isEditing = false }) => {
  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <Form.Item<IUserCreate>
        name="is_active"
        valuePropName="checked"
        initialValue={true}
      >
        <Checkbox>Ativo</Checkbox>
      </Form.Item>

      <Form.Item<IUserCreate>
        label="Nível de acesso"
        name="role"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Select
          placeholder="Selecione um nível de acesso"
          options={Object.values(UserRoles).map(key => ({
            label: UserRolesTranslated[key],
            value: key,
          }))}
        />
      </Form.Item>

      <Form.Item<IUserCreate>
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IUserCreate>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IUserCreate>
        label="Senha"
        name="password"
        rules={
          isEditing ? [] : [{ required: true, message: "Campo obrigatório" }]
        }
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<IUserCreate>
        label="Confirmação de senha"
        name="password_confirmation"
        dependencies={["password"]}
        rules={
          isEditing
            ? []
            : [
                {
                  required: true,
                  message: "Por favor, confirme sua senha!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("As senhas não são iguais!")
                    );
                  },
                }),
              ]
        }
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

export default React.memo(UserForm);
