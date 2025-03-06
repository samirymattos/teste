"use client";

import { Button, Form, Modal, notification } from "antd";
import React, { useCallback, useState } from "react";
import AddressForm from "../Form";
import { IAddressCreate } from "@/interfaces/IAddress";
import { addressService } from "@/services/address.service";

interface AddressCreateProps {
  field: "supplier_id" | "user_id" | "affiliate_consultant_id" | "student_id";
  value: string;
  fetchData: () => void;
}

const AddressCreate: React.FC<AddressCreateProps> = ({
  field,
  value,
  fetchData,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form] = Form.useForm<IAddressCreate>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitData = useCallback(() => {
    if (isLoading) return;
    form.validateFields().then(values => {
      setIsLoading(true);

      addressService
        .create({
          ...values,
          [field]: value,
        })
        .then(() => {
          notification.success({
            message: "Endereço cadastrada com sucesso!",
          });
          fetchData();
          setIsOpen(false);
          form.resetFields();
        })
        .catch(() => {
          notification.error({
            message: "Erro ao cadastrar endereço",
          });
        })
        .finally(() => setIsLoading(false));
    });
  }, [form, isLoading, field, value, fetchData]);

  return (
    <>
      <Button type="default" onClick={() => setIsOpen(true)}>
        Cadastrar endereço
      </Button>
      <Modal
        title="Cadastrar endereço"
        open={isOpen}
        onOk={submitData}
        onCancel={() => setIsOpen(false)}
        okButtonProps={{ loading: isLoading }}
      >
        <AddressForm form={form} />
      </Modal>
    </>
  );
};

export default React.memo(AddressCreate);
