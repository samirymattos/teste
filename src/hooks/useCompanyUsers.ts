import { ICompanyUser } from "@/interfaces/ICompanyUser";
import { companyUserService } from "@/services/company-user.service";
import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";

interface UseCompanyUserProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseCompanyUserResponse {
  companyUsers: ICompanyUser[];
  companyUsersTotal: number;
  companyUsersRefresh: () => void;
  companyUsersLoading: boolean;
}

export const useCompanyUsers = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseCompanyUserProps): UseCompanyUserResponse => {
  const [data, setData] = useState<ICompanyUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    companyUserService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.companiesUser.result);
        setTotal(res.data.companiesUser.total);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar usuários da empresa",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    companyUsers: data,
    companyUsersTotal: total,
    companyUsersRefresh: fetchData,
    companyUsersLoading: isLoading,
  };
};
