"use client";

import { Constants } from "@/constants";
import { Table } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { AddressesColumn } from "./column";
import { useAddresses } from "@/hooks/useAddresses";
import AddressCreate from "../Create";
import { IAddress } from "@/interfaces/IAddress";
import AddressEdit from "../Edit";

interface AddressListProps {
  field: "supplier_id" | "user_id" | "affiliate_consultant_id" | "student_id";
  value: string;
}

const AddressList: React.FC<AddressListProps> = ({ field, value }) => {
  const [page, setPage] = useState<number>(1);

  const { addresses, addressesLoading, addressesTotal, addressesRefresh } =
    useAddresses(
      useMemo(
        () => ({
          page,
          limit: Constants.per_page,
          filters: {
            [field]: value,
          },
        }),
        [page, field, value]
      )
    );

  const [editSelected, setEditSelected] = useState<IAddress>();
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);

  const selectToEdit = useCallback((value: IAddress) => {
    setEditSelected(value);
    setEditIsOpen(true);
  }, []);

  return (
    <>
      <Table
        rowKey="id"
        className="mb-8"
        columns={AddressesColumn(addressesRefresh, selectToEdit)}
        dataSource={addresses}
        loading={addressesLoading}
        pagination={{
          hideOnSinglePage: true,
          current: page,
          pageSize: Constants.per_page,
          total: addressesTotal,
          onChange: page => setPage(page),
        }}
      />
      <AddressEdit
        selected={editSelected}
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        fetchData={addressesRefresh}
      />
      <AddressCreate field={field} value={value} fetchData={addressesRefresh} />
    </>
  );
};

export default React.memo(AddressList);
