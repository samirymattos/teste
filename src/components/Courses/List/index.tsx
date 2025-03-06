// @ts-nocheck
"use client";

import PageTitle from "@/components/PageTitle";
import { Constants } from "@/constants";
import { useCourses } from "@/hooks/useCourses";
import { Button, Input, Table } from "antd";
import React, { useMemo, useState } from "react";
import { CourseColumns } from "./column";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

const CoursesList: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<object>({});

  const debouncedFilter = useDebounce(filters, 2000);

  const { courses, coursesLoading, coursesTotal, coursesRefresh } =
    useCourses(
      useMemo(
        () => ({
          page,
          limit: Constants.per_page,
          filters: debouncedFilter as unknown as object,
        }),
        [page, debouncedFilter]
      )
    );
  return (
    <div className="w-7xl container mx-auto">
      <PageTitle
        navTitle="Sistema >"
        title="Cursos"
        action={
          <Link href="/dashboard/configuracoes/cursos/cadastrar">
            <Button type="primary">Adicionar Curso</Button>
          </Link>
        }
      />
      <div className="container-conteudo">
        <Input
          className="mb-2 ml-2 w-1/3 pl-5"
          placeholder="Filtrar por nome..."
          onChange={e => setFilters({ name: e.target.value })}
          value={filters.name}
        />
        <Table
          rowKey="id"
          columns={CourseColumns(coursesRefresh)}
          dataSource={courses}
          loading={coursesLoading}
          onRow={record => {
            return {
              onClick: () => {
                router.push(`/dashboard/cursos/${record.id}/editar`);
              },
            };
          }}
          pagination={{
            current: page,
            pageSize: Constants.per_page,
            total: coursesTotal,
            onChange: page => setPage(page),
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(CoursesList);
