import { ITag } from "@/interfaces/ITag";
import { tagsService } from "@/services/tag.service";
import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";

interface UseTagsProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseTagsResponse {
  tags: ITag[];
  tagsTotal: number;
  tagsRefresh: () => void;
  tagsLoading: boolean;
}

export const useTags = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseTagsProps): UseTagsResponse => {
  const [data, setData] = useState<ITag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    tagsService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.tags.result);
        setTotal(res.data.tags.total);
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
    tags: data,
    tagsTotal: total,
    tagsRefresh: fetchData,
    tagsLoading: isLoading,
  };
};
