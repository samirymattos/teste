import { ISalePaymentMethod } from "@/interfaces/ISalePaymentMethod";
import { salePaymentMethodService } from "@/services/sale-payment-method.service";
import { useEffect, useState } from "react";

interface UseSalePaymentMethodProps {
  id: string;
}

interface UseSalePaymentMethodResponse {
  salePaymentMethod: ISalePaymentMethod | null;
  salePaymentMethodLoading: boolean;
  salePaymentMethodRefresh: () => void;
}

export const useSalePaymentMethod = ({
  id,
}: UseSalePaymentMethodProps): UseSalePaymentMethodResponse => {
  const [data, setData] = useState<ISalePaymentMethod | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    salePaymentMethodService
      .getById(id)
      .then(res => {
        setData(res.data.salePaymentMethod);
      })
      .catch(() => {
        console.log("Erro ao buscar o registro");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    salePaymentMethod: data,
    salePaymentMethodLoading: isLoading,
    salePaymentMethodRefresh: fetchData,
  };
};
