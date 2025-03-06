// @ts-nocheck
"use client";

import PageTitle from "@/components/PageTitle";
import { Constants } from "@/constants";
import { useUsers } from "@/hooks/useUsers";
import { Button, Input, Table } from "antd";
import React, { useMemo, useState } from "react";
import { UserColumns } from "./column";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

const UserList: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);

  const [filters, setFilters] = useState<object>({});

  const debouncedFilter = useDebounce(filters, 2000);

  const { users, usersLoading, usersTotal, usersRefresh } = useUsers(
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
        title="Colaboradores"
        action={
          <Link href="/dashboard/configuracoes/colaboradores/cadastrar">
            <Button type="primary">Adicionar colaborador</Button>
          </Link>
        }
      />
      <div className="container-conteudo">
        <Input
          className="mb-2 ml-2 w-1/3 pl-5"
          placeholder="Filtrar..."
          onChange={e => setFilters({ name: e.target.value })}
          value={filters.name}
        />
        <Table
          rowKey="id"
          columns={UserColumns(usersRefresh)}
          dataSource={users}
          loading={usersLoading}
          onRow={record => {
            return {
              onClick: () => {
                router.push(
                  `/dashboard/configuracoes/colaboradores/${record.id}/editar`
                );
              },
            };
          }}
          pagination={{
            current: page,
            pageSize: Constants.per_page,
            total: usersTotal,
            onChange: page => setPage(page),
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(UserList);
