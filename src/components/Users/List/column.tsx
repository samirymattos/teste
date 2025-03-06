import DeleteInColumn from "@/components/DeleteInColumn";
import { IUser } from "@/interfaces/IUser";
import { userService } from "@/services/user.service";
import { Tag, Tooltip } from "antd";
import { ColumnGroupType } from "antd/es/table";
import { ColumnType } from "antd/lib/table";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { CiEdit } from "react-icons/ci";
import UserRoleToTag from "../UserRoleToTag";
import { UserRoles } from "@/enum/UserRoles";

type UserColumnsProps = (
  usersRefresh: () => void
) => (ColumnGroupType<any> | ColumnType<any>)[];

export const UserColumns: UserColumnsProps = usersRefresh => {
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
      key: "role",
      title: "Cargo",
      dataIndex: "role",
      render: (text: UserRoles) => <UserRoleToTag role={text} />,
    },
    {
      key: "name",
      title: "Nome",
      dataIndex: "name",
    },
    {
      key: "email",
      title: "E-mail",
      dataIndex: "email",
    },
    {
      key: "created_at",
      title: "Data de criação",
      dataIndex: "created_at",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ações",
      render: (_, record: IUser) => (
        <div className="flex justify-around" onClick={e => e.stopPropagation()}>
          <Tooltip title="Editar">
            <Link
              href={`/dashboard/configuracoes/colaboradores/${record.id}/editar`}
            >
              <CiEdit size={20} />
            </Link>
          </Tooltip>
          <DeleteInColumn
            id={record.id}
            service={userService}
            refresh={usersRefresh}
            title="Deseja deletar o colaborador?"
            successMessage="Colaborador deletado com sucesso!"
            errorMessage="Erro ao deletar colaborador"
          />
        </div>
      ),
    },
  ];
};
