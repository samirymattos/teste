import DeleteInColumn from "@/components/DeleteInColumn";
import { ICourse } from "@/interfaces/ICourse";
import { courseService } from "@/services/course.service";
import { Tag, Tooltip } from "antd";
import { ColumnGroupType } from "antd/es/table";
import { ColumnType } from "antd/lib/table";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { CiEdit } from "react-icons/ci";

type CourseColumnsProps = (
  courseRefresh: () => void
) => (ColumnGroupType<any> | ColumnType<any>)[];

export const CourseColumns: CourseColumnsProps = courseRefresh => {
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
      key: "modality",
      title: "Modalidade",
      dataIndex: "modality",
      render: (text: string) => (text === "INPERSON" ? "Presencial" : "Online"),
    },
    {
      key: "cost_value",
      title: "Custo",
      dataIndex: "cost_value",
      render: (text: number) => `R$ ${(Number(text) || 0).toFixed(2)}`,
    },
    {
      key: "sale_value",
      title: "Valor de Venda",
      dataIndex: "sale_value",
      render: (text: number) => `R$ ${(Number(text) || 0).toFixed(2)}`,
    },
    {
      key: "workload",
      title: "Carga Horária",
      dataIndex: "workload",
      render: (text: number) => `${text} horas`,
    },
    {
      key: "course_documentations",
      title: "Documentações",
      dataIndex: "course_documentations",
      render: (docs: { type: string; default_documentation_id: string }[]) =>
        docs?.length ? docs.map(doc => <Tag key={doc.default_documentation_id}>{doc.type}</Tag>) : "Nenhuma",
    },
    {
      key: "created_at",
      title: "Data de criação",
      dataIndex: "created_at",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ações",
      render: (_, record: ICourse) => (
        <div className="flex justify-around" onClick={e => e.stopPropagation()}>
          <Tooltip title="Editar">
            <Link href={`/dashboard/configuracoes/cursos/${record.id}/editar`}>
              <CiEdit size={20} />
            </Link>
          </Tooltip>
          <DeleteInColumn
            id={record.id}
            service={courseService}
            refresh={courseRefresh}
            title="Deseja deletar o curso?"
            successMessage="Curso deletado com sucesso!"
            errorMessage="Erro ao deletar curso"
          />
        </div>
      ),
    },
  ];
};