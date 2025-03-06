import { IAffiliate } from "@/interfaces/IAffiliate";
import { affiliateService } from "@/services/affiliate.service";
import { useEffect, useState } from "react";

interface UseAffiliateProps {
  id: string;
}

interface UseAffiliateResponse {
  affiliate: IAffiliate | null;
  affiliateLoading: boolean;
  affiliateRefresh: () => void;
}

export const useAffiliate = ({
  id,
}: UseAffiliateProps): UseAffiliateResponse => {
  const [data, setData] = useState<IAffiliate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    affiliateService
      .getById(id)
      .then(res => {
        setData(res.data.affiliateConsultant);
      })
      .catch(() => {
        console.log("Erro ao buscar captadores");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    affiliate: data,
    affiliateLoading: isLoading,
    affiliateRefresh: fetchData,
  };
};
