"use client";

import { IAddressCreate } from "@/interfaces/IAddress";
import {
  Alert,
  Checkbox,
  ColorPicker,
  Form,
  FormInstance,
  Input,
  notification,
} from "antd";
import React, { useCallback } from "react";
import cep from "cep-promise";
import Masks from "@/utils/masks";

interface AddressFormProps {
  form: FormInstance<IAddressCreate>;
  isEditing?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
  form,
  isEditing = false,
}) => {
  const handleZipCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const zipCode = Masks.cep(e.target.value);
      if (zipCode.length === 9) {
        cep(zipCode.replace("-", ""))
          .then(response => {
            form.setFieldsValue({
              zip_code: zipCode,
              city: response.city,
              district: response.neighborhood,
              state: response.state,
              street: response.street,
            });
          })
          .catch(() => {
            notification.error({
              message: "CEP não encontrado",
            });
            form.setFieldsValue({
              zip_code: zipCode,
            });
          });
      } else {
        form.setFieldsValue({
          zip_code: zipCode,
        });
      }
    },
    [form]
  );
  return (
    <Form form={form} layout="vertical">
      <Form.Item<IAddressCreate>
        name="is_default"
        valuePropName="checked"
        initialValue={true}
      >
        <Checkbox>Endereço preferencial</Checkbox>
      </Form.Item>

      <Form.Item<IAddressCreate>
        label="CEP"
        name="zip_code"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input onChange={handleZipCode} />
      </Form.Item>

      <Form.Item<IAddressCreate>
        label="Rua"
        name="street"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IAddressCreate>
        label="Número"
        name="number"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IAddressCreate> label="Complemento" name="complement">
        <Input />
      </Form.Item>

      <Form.Item<IAddressCreate>
        label="UF"
        name="state"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IAddressCreate>
        label="Cidade"
        name="city"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IAddressCreate>
        label="Bairro"
        name="district"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IAddressCreate>
        label="País"
        name="country"
        initialValue={"Brasil"}
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default React.memo(AddressForm);
