"use client";

import PageTitle from "@/components/PageTitle";
import { Constants } from "@/constants";
import { Button, Table } from "antd";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { TagColumn } from "./column";
import { useTags } from "@/hooks/useTags";

const TagList: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { tags, tagsLoading, tagsTotal, tagsRefresh } = useTags(
    useMemo(
      () => ({
        page,
        limit: Constants.per_page,
        filters: {},
      }),
      [page]
    )
  );

  return (
    <div className="w-7xl container mx-auto">
      <PageTitle
        navTitle="Sistema >"
        title="Tags"
        action={
          <Link href="/dashboard/configuracoes/tags/cadastrar">
            <Button type="primary">Adicionar tag</Button>
          </Link>
        }
      />
      <div className="container-conteudo">
        <Table
          rowKey="id"
          columns={TagColumn(tagsRefresh)}
          dataSource={tags}
          loading={tagsLoading}
          pagination={{
            current: page,
            pageSize: Constants.per_page,
            total: tagsTotal,
            onChange: page => setPage(page),
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(TagList);
