import DeleteInColumn from "@/components/DeleteInColumn";
import { IAddress } from "@/interfaces/IAddress";
import { addressService } from "@/services/address.service";
import { Tooltip } from "antd";
import { ColumnGroupType } from "antd/es/table";
import { ColumnType } from "antd/lib/table";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

type AddressesColumnProps = (
  fetchData: () => void,
  selectToEdit: (value: IAddress) => void
) => (ColumnGroupType<any> | ColumnType<any>)[];

export const AddressesColumn: AddressesColumnProps = (
  fetchData,
  selectToEdit
) => {
  return [
    {
      key: "is_default",
      title: "Pref.",
      dataIndex: "is_default",
      render: (text: string) => text && <FaStar size={20} color="yellow" />,
    },
    {
      key: "zip_code",
      title: "CEP",
      dataIndex: "zip_code",
    },
    {
      key: "state",
      title: "UF",
      dataIndex: "state",
    },
    {
      key: "city",
      title: "Cidade",
      dataIndex: "city",
    },
    {
      key: "district",
      title: "Bairro",
      dataIndex: "district",
    },
    {
      key: "street",
      title: "Rua",
      dataIndex: "street",
    },
    {
      key: "number",
      title: "Nº",
      dataIndex: "number",
    },
    {
      key: "complement",
      title: "Complemento",
      dataIndex: "complement",
    },
    {
      title: "Ações",
      render: (_, record: IAddress) => (
        <div className="flex justify-around">
          <Tooltip title="Editar">
            <CiEdit
              size={20}
              className="cursor-pointer"
              onClick={() => selectToEdit(record)}
            />
          </Tooltip>
          <DeleteInColumn
            id={record.id}
            service={addressService}
            refresh={fetchData}
            title="Deseja deletar esse endereço?"
            successMessage="Endereço deletado com sucesso!"
            errorMessage="Erro ao deletar endereço"
          />
        </div>
      ),
    },
  ];
};
