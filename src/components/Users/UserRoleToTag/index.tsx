import { UserRoles, UserRolesTranslated } from "@/enum/UserRoles";
import { Tag } from "antd";
import React from "react";

const UserRoleToTag = ({ role }: { role: UserRoles }) => {
  const roleTranslated = UserRolesTranslated[role];
  return (
    <Tag color={role === UserRoles.ADMIN ? "red" : "green"}>
      {roleTranslated}
    </Tag>
  );
};

export default React.memo(UserRoleToTag);
