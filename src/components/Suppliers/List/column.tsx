import DeleteInColumn from "@/components/DeleteInColumn";
import { ISupplier } from "@/interfaces/ISuppliers";
import { supplierService } from "@/services/suppliers.service";
import { Tag, Tooltip } from "antd";
import { ColumnGroupType } from "antd/es/table";
import { ColumnType } from "antd/lib/table";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { CiEdit } from "react-icons/ci";

type SupplierColumnsProps = (
  supplierRefresh: () => void
) => (ColumnGroupType<any> | ColumnType<any>)[];

export const SupplierColumns: SupplierColumnsProps = supplierRefresh => {
  return [
    {
      key: "is_active",
      title: "Ativo",
      dataIndex: "is_active",
      render: (text: boolean) => (
        <Tag color={text ? "success" : "warning"}>{text ? "Ativo" : "Inativo"}</Tag>
      ),
    },
    {
      key: "name",
      title: "Nome",
      dataIndex: "name",
    },
    {
      key: "document",
      title: "Documento",
      dataIndex: "document",
    },
    {
      key: "os_key",
      title: "Chave OS",
      dataIndex: "os_key",
    },
    {
      key: "email",
      title: "E-mail",
      dataIndex: "email",
    },
    {
      key: "phone",
      title: "Telefone",
      dataIndex: "phone",
    },
    {
      key: "observation",
      title: "Observação",
      dataIndex: "observation",
    },
    {
      key: "created_at",
      title: "Data de criação",
      dataIndex: "created_at",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ações",
      render: (_, record: ISupplier) => (
        <div className="flex justify-around" onClick={e => e.stopPropagation()}>
          <Tooltip title="Editar">
            <Link href={`/dashboard/configuracoes/fornecedores/${record.id}/editar`}>
              <CiEdit size={20} />
            </Link>
          </Tooltip>
          <DeleteInColumn
            id={record.id}
            service={supplierService}
            refresh={supplierRefresh}
            title="Deseja deletar o fornecedor?"
            successMessage="Fornecedor deletado com sucesso!"
            errorMessage="Erro ao deletar fornecedor"
          />
        </div>
      ),
    },
  ];
};
