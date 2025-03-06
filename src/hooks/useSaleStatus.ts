import { ISaleStatus } from "@/interfaces/ISaleStatus";
import { saleStatusService } from "@/services/sale-status.service";
import { useEffect, useState } from "react";

interface UseSaleStatusProps {
  id: string;
}

interface UseSaleStatusResponse {
  saleStatus: ISaleStatus | null;
  saleStatusLoading: boolean;
  saleStatusRefresh: () => void;
}

export const useSaleStatus = ({
  id,
}: UseSaleStatusProps): UseSaleStatusResponse => {
  const [data, setData] = useState<ISaleStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    saleStatusService
      .getById(id)
      .then(res => {
        setData(res.data.saleStatus);
      })
      .catch(() => {
        console.log("Erro ao buscar o status de venda");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    saleStatus: data,
    saleStatusLoading: isLoading,
    saleStatusRefresh: fetchData,
  };
};
