// @ts-nocheck
"use client";

import PageTitle from "@/components/PageTitle";
import { Constants } from "@/constants";
import { useSuppliers } from "@/hooks/useSuppliers";
import { Button, Input, Table } from "antd";
import React, { useMemo, useState } from "react";
import { SupplierColumns } from "./column";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

const SuppliersList: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<object>({});

  const debouncedFilter = useDebounce(filters, 2000);

  const { suppliers, suppliersLoading, suppliersTotal, suppliersRefresh } =
    useSuppliers(
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
        title="Fornecedores"
        action={
          <Link href="/dashboard/configuracoes/fornecedores/cadastrar">
            <Button type="primary">Adicionar Fornecedor</Button>
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
          columns={SupplierColumns(suppliersRefresh)}
          dataSource={suppliers}
          loading={suppliersLoading}
          scroll={{ x: "max-content" }}
          onRow={record => {
            return {
              onClick: () => {
                router.push(`/dashboard/fornecedores/${record.id}/editar`);
              },
            };
          }}
          pagination={{
            current: page,
            pageSize: Constants.per_page,
            total: suppliersTotal,
            onChange: page => setPage(page),
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(SuppliersList);
