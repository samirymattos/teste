import { ISaleChannel } from "@/interfaces/ISaleChannel";
import { saleChannelService } from "@/services/sale-channel.service";
import { useEffect, useState } from "react";

interface UseSaleChannelProps {
  id: string;
}

interface UseSaleChannelResponse {
  saleChannel: ISaleChannel | null;
  saleChannelLoading: boolean;
  saleChannelRefresh: () => void;
}

export const useSaleChannel = ({
  id,
}: UseSaleChannelProps): UseSaleChannelResponse => {
  const [data, setData] = useState<ISaleChannel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    saleChannelService
      .getById(id)
      .then(res => {
        setData(res.data.saleChannel);
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
    saleChannel: data,
    saleChannelLoading: isLoading,
    saleChannelRefresh: fetchData,
  };
};
