import { ICompany } from "@/interfaces/ICompany";
import { companyService } from "@/services/company.service";
import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";

interface UseCompaniesProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseCompaniesResponse {
  companies: ICompany[];
  companiesTotal: number;
  companiesRefresh: () => void;
  companiesLoading: boolean;
}

export const useCompanies = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseCompaniesProps): UseCompaniesResponse => {
  const [data, setData] = useState<ICompany[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    companyService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.companies.result);
        setTotal(res.data.companies.total);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar usuários",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    companies: data,
    companiesTotal: total,
    companiesRefresh: fetchData,
    companiesLoading: isLoading,
  };
};
