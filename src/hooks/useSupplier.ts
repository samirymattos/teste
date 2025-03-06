import { ISupplier } from "@/interfaces/ISuppliers";
import { supplierService } from "@/services/suppliers.service";
import { useEffect, useState } from "react";

interface UseSupplierProps {
  id: string;
}

interface UseSupplierResponse {
  supplier: ISupplier | null;
  supplierLoading: boolean;
  supplierRefresh: () => void;
}

export const useSupplier = ({ id }: UseSupplierProps): UseSupplierResponse => {
  const [data, setData] = useState<ISupplier | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    supplierService
      .getById(id)
      .then(res => {
        setData(res.data.supplier);
      })
      .catch(() => {
        console.log("Erro ao buscar fornecedor");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    supplier: data,
    supplierLoading: isLoading,
    supplierRefresh: fetchData,
  };
};
