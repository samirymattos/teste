import { affiliateService } from "@/services/affiliate.service";
import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { IAffiliate } from "../interfaces/IAffiliate";

interface UseAffiliatesProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseAffiliatesResponse {
  affiliates: IAffiliate[];
  affiliatesTotal: number;
  affiliatesRefresh: () => void;
  affiliatesLoading: boolean;
}

export const useAffiliates = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseAffiliatesProps): UseAffiliatesResponse => {
  const [data, setData] = useState<IAffiliate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    affiliateService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.affiliateConsultants.result);
        setTotal(res.data.affiliateConsultants.total);
      })
      .catch(e => {
        notification.error({
          message: "Erro ao buscar Captadores",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    affiliates: data,
    affiliatesTotal: total,
    affiliatesRefresh: fetchData,
    affiliatesLoading: isLoading,
  };
};
