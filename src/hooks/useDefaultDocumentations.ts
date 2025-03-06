import { IDefaultDocumentation } from "@/interfaces/IDefaultDocumentation";
import { defaultDocumentationService } from "@/services/default-documentation.service";
import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";

interface UseDefaultDocumentationProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseDefaultDocumentationResponse {
  defaultDocumentations: IDefaultDocumentation[];
  defaultDocumentationsTotal: number;
  defaultDocumentationsRefresh: () => void;
  defaultDocumentationsLoading: boolean;
}

export const useDefaultDocumentations = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseDefaultDocumentationProps): UseDefaultDocumentationResponse => {
  const [data, setData] = useState<IDefaultDocumentation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    defaultDocumentationService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.defaultDocumentations.result);
        setTotal(res.data.defaultDocumentations.total);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar registros",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    defaultDocumentations: data,
    defaultDocumentationsTotal: total,
    defaultDocumentationsRefresh: fetchData,
    defaultDocumentationsLoading: isLoading,
  };
};
