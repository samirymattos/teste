import React, { useState } from "react";
import { Popconfirm, notification } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";

interface DeleteInColumnProps<T> {
  id: number | string;
  service: any;
  refresh: () => void;
  title?: string;
  successMessage?: string;
  errorMessage?: string;
  method?: string;
}

const DeleteInColumn = <T extends object>({
  id,
  service,
  refresh,
  title = "",
  successMessage = "",
  errorMessage = "",
  method = "remove",
}: DeleteInColumnProps<T>) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Popconfirm
      title={title}
      open={open}
      placement="bottomRight"
      onConfirm={() => {
        if (loading) return false;
        setLoading(true);

        // @ts-ignore - service type
        service[method](id)
          .then(() => {
            notification.success({
              message: "Sucesso!",
              description: successMessage,
            });
            refresh();
            setOpen(false);
          })
          .catch(() => {
            notification.error({
              message: "Erro!",
              description: errorMessage,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }}
      okButtonProps={{
        loading,
      }}
      onCancel={() => setOpen(false)}
    >
      <FaRegTrashAlt
        size={17}
        className="cursor-pointer"
        color="red"
        onClick={() => setOpen(true)}
      />
    </Popconfirm>
  );
};

export default DeleteInColumn;
