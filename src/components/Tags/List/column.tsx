import DeleteInColumn from "@/components/DeleteInColumn";
import { ITag } from "@/interfaces/ITag";
import { IUser } from "@/interfaces/IUser";
import { saleStatusService } from "@/services/sale-status.service";
import { tagsService } from "@/services/tag.service";
import { Tag, Tooltip } from "antd";
import { ColumnGroupType } from "antd/es/table";
import { ColumnType } from "antd/lib/table";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { CiEdit } from "react-icons/ci";
import TagsTypeToTag from "../TagsTypeToTag";
import { TagTypes } from "@/enum/TagTypes";

type TagColumnProps = (
  fetchData: () => void
) => (ColumnGroupType<any> | ColumnType<any>)[];

export const TagColumn: TagColumnProps = fetchData => {
  return [
    {
      key: "is_active",
      title: "Ativo",
      dataIndex: "is_active",
      render: (text: string) => (
        <Tag color={text ? "green" : "orange"}>
          {text ? "Ativo" : "Inativo"}
        </Tag>
      ),
    },
    {
      key: "type",
      title: "Tipo",
      dataIndex: "type",
      render: (text: TagTypes) => <TagsTypeToTag type={text} />,
    },
    {
      key: "name",
      title: "Nome",
      dataIndex: "name",
    },
    {
      key: "color",
      title: "Color",
      dataIndex: "color",
      render: (text: string) => <Tag color={text}>{text}</Tag>,
    },
    {
      key: "created_at",
      title: "Data de criação",
      dataIndex: "created_at",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ações",
      render: (_, record: ITag) => (
        <div className="flex justify-around">
          <Tooltip title="Editar">
            <Link href={`/dashboard/configuracoes/tags/${record.id}/editar`}>
              <CiEdit size={20} />
            </Link>
          </Tooltip>
          <DeleteInColumn
            id={record.id}
            service={tagsService}
            refresh={fetchData}
            title="Deseja deletar essa tag?"
            successMessage="Tag deletado com sucesso!"
            errorMessage="Erro ao deletar tag"
          />
        </div>
      ),
    },
  ];
};
