import { useUsers } from "@/hooks/useUsers";
import { Select } from "antd";
import React, { useMemo } from "react";

interface SelectUserProps {
  value?: string;
  onChange?: (value: string) => void;
  actualUsers: string[];
}

const SelectUser: React.FC<SelectUserProps> = ({
  value,
  onChange,
  actualUsers,
}) => {
  const { users, usersLoading } = useUsers(
    useMemo(
      () => ({
        page: 1,
        per_page: 10,
        filters: {
          is_active: true,
        },
      }),
      []
    )
  );

  return (
    <Select
      showSearch
      placeholder="Selecione um usuário"
      optionFilterProp="children"
      options={users
        .filter(obj => !actualUsers.some(actualUser => actualUser === obj.id))
        .map(user => ({
          label: user.name,
          value: user.id,
        }))}
      value={value}
      onChange={onChange}
      loading={usersLoading}
    />
  );
};

export default React.memo(SelectUser);
