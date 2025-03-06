import { ISaleChannel } from "@/interfaces/ISaleChannel";
import { saleChannelService } from "@/services/sale-channel.service";
import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";

interface UseSaleChannelsProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseSaleChannelsResponse {
  saleChannels: ISaleChannel[];
  saleChannelsTotal: number;
  saleChannelsRefresh: () => void;
  saleChannelsLoading: boolean;
}

export const useSaleChannels = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseSaleChannelsProps): UseSaleChannelsResponse => {
  const [data, setData] = useState<ISaleChannel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    saleChannelService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.saleChannels.result);
        setTotal(res.data.saleChannels.total);
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
    saleChannels: data,
    saleChannelsTotal: total,
    saleChannelsRefresh: fetchData,
    saleChannelsLoading: isLoading,
  };
};
