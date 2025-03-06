import { ITag } from "@/interfaces/ITag";
import { tagsService } from "@/services/tag.service";
import { useEffect, useState } from "react";

interface UseTagProps {
  id: string;
}

interface UseTagResponse {
  tag: ITag | null;
  tagLoading: boolean;
  tagRefresh: () => void;
}

export const useTag = ({ id }: UseTagProps): UseTagResponse => {
  const [data, setData] = useState<ITag | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    tagsService
      .getById(id)
      .then(res => {
        setData(res.data.tag);
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
    tag: data,
    tagLoading: isLoading,
    tagRefresh: fetchData,
  };
};
