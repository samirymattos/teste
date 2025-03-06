import { ISupplier } from "@/interfaces/ISuppliers";
import { supplierService } from "@/services/suppliers.service";
import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";

interface UseSuppliersProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseSuppliersResponse {
  suppliers: ISupplier[];
  suppliersTotal: number;
  suppliersRefresh: () => void;
  suppliersLoading: boolean;
}

export const useSuppliers = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseSuppliersProps): UseSuppliersResponse => {
  const [data, setData] = useState<ISupplier[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    supplierService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.suppliers.result);
        setTotal(res.data.suppliers.total);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar fornecedores",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    suppliers: data,
    suppliersTotal: total,
    suppliersRefresh: fetchData,
    suppliersLoading: isLoading,
  };
};
