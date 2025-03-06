import { ISaleStatus } from "@/interfaces/ISaleStatus";
import { saleStatusService } from "@/services/sale-status.service";
import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";

interface UseSaleStatusesProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseSaleStatusesResponse {
  saleStatuses: ISaleStatus[];
  saleStatusesTotal: number;
  saleStatusesRefresh: () => void;
  saleStatusesLoading: boolean;
}

export const useSalesStatus = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseSaleStatusesProps): UseSaleStatusesResponse => {
  const [data, setData] = useState<ISaleStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    saleStatusService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.saleStatuses.result);
        setTotal(res.data.saleStatuses.total);
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
    saleStatuses: data,
    saleStatusesTotal: total,
    saleStatusesRefresh: fetchData,
    saleStatusesLoading: isLoading,
  };
};
