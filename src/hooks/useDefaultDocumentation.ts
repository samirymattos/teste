import { IDefaultDocumentation } from "@/interfaces/IDefaultDocumentation";
import { defaultDocumentationService } from "@/services/default-documentation.service";
import { useEffect, useState } from "react";

interface UseDefaultDocuemntationProps {
  id: string;
}

interface UseDefaultDocumentationResponse {
  defaultDocumentation: IDefaultDocumentation | null;
  defaultDocumentationLoading: boolean;
  defaultDocumentationRefresh: () => void;
}

export const useDefaultDocumentation = ({
  id,
}: UseDefaultDocuemntationProps): UseDefaultDocumentationResponse => {
  const [data, setData] = useState<IDefaultDocumentation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    defaultDocumentationService
      .getById(id)
      .then(res => {
        setData(res.data.defaultDocumentations);
      })
      .catch(() => {
        console.log("Erro ao buscar registro");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    defaultDocumentation: data,
    defaultDocumentationLoading: isLoading,
    defaultDocumentationRefresh: fetchData,
  };
};
