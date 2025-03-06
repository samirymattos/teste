import { ICompany } from "@/interfaces/ICompany";
import { companyService } from "@/services/company.service";
import { useEffect, useState } from "react";

interface UseCompanyProps {
  id: string;
}

interface UseCompanyResponse {
  company: ICompany | null;
  companyLoading: boolean;
  companyRefresh: () => void;
}

export const useCompany = ({ id }: UseCompanyProps): UseCompanyResponse => {
  const [data, setData] = useState<ICompany | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    companyService
      .getById(id)
      .then(res => {
        setData(res.data.company);
      })
      .catch(() => {
        console.log("Erro ao buscar usuário");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    company: data,
    companyLoading: isLoading,
    companyRefresh: fetchData,
  };
};
