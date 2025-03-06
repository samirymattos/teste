import { ISalePaymentMethod } from "@/interfaces/ISalePaymentMethod";
import { salePaymentMethodService } from "@/services/sale-payment-method.service";
import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";

interface UseSalePaymentMethodProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseSalePaymentMethodResponse {
  salePaymentMethods: ISalePaymentMethod[];
  salePaymentMethodsTotal: number;
  salePaymentMethodsRefresh: () => void;
  salePaymentMethodsLoading: boolean;
}

export const useSalePaymentMethods = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseSalePaymentMethodProps): UseSalePaymentMethodResponse => {
  const [data, setData] = useState<ISalePaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    salePaymentMethodService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.salePaymentMethods.result);
        setTotal(res.data.salePaymentMethods.total);
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
    salePaymentMethods: data,
    salePaymentMethodsTotal: total,
    salePaymentMethodsRefresh: fetchData,
    salePaymentMethodsLoading: isLoading,
  };
};
