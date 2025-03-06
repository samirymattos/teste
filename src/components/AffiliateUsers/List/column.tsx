import DeleteInColumn from "@/components/DeleteInColumn";
import { IAffiliate } from "@/interfaces/IAffiliate";
import { affiliateService } from "@/services/affiliate.service";
import { Tag, Tooltip } from "antd";
import { ColumnGroupType } from "antd/es/table";
import { ColumnType } from "antd/lib/table";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { CiEdit } from "react-icons/ci";

type AffiliateColumnsProps = (
  affiliateRefresh: () => void
) => (ColumnGroupType<any> | ColumnType<any>)[];

export const AffiliateColumns: AffiliateColumnsProps = affiliateRefresh => {
  return [
    {
      key: "is_active",
      title: "Ativo",
      dataIndex: "is_active",
      render: (text: string) => (
        <Tag color={text ? "success" : "warning"}>
          {text ? "Ativo" : "Inativo"}
        </Tag>
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
      key: "email",
      title: "E-mail",
      dataIndex: "email",
    },
    {
      key: "phone",
      title: "Telelfone",
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
      render: (_, record: IAffiliate) => (
        <div className="flex justify-around" onClick={e => e.stopPropagation()}>
          <Tooltip title="Editar">
            <Link
              href={`/dashboard/configuracoes/captadores/${record.id}/editar`}
            >
              <CiEdit size={20} />
            </Link>
          </Tooltip>
          <DeleteInColumn
            id={record.id}
            service={affiliateService}
            refresh={affiliateRefresh}
            title="Deseja deletar o captador?"
            successMessage="Captador deletado com sucesso!"
            errorMessage="Erro ao deletar captador"
          />
        </div>
      ),
    },
  ];
};
