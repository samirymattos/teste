import { useAffiliates } from "@/hooks/useAffiliates";
import { Select } from "antd";
import React, { useMemo } from "react";

interface SelectAffiliateUsersProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectAffiliateUsers: React.FC<SelectAffiliateUsersProps> = ({
  value,
  onChange,
}) => {
  const { affiliates, affiliatesLoading } = useAffiliates(
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
      placeholder="Selecione um CEA"
      optionFilterProp="children"
      options={affiliates
        .map(affiliate => ({
          label: affiliate.name,
          value: affiliate.id,
        }))}
      value={value}
      onChange={onChange}
      loading={affiliatesLoading}
    />
  );
};

export default React.memo(SelectAffiliateUsers);
