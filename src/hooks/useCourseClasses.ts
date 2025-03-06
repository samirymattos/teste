import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { ICourseClasse } from '../interfaces/ICourseClasse';
import { courseClasseService } from '@/services/course-classes.service';

interface UseCourseClassesProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseCourseClassesResponse {
  courseClasses: ICourseClasse[];
  courseClassesTotal: number;
  courseClassesRefresh: () => void;
  courseClassesLoading: boolean;
}

export const useCourseClasses = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseCourseClassesProps): UseCourseClassesResponse => {
  const [data, setData] = useState<ICourseClasse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    courseClasseService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.courseClasses.result);
        setTotal(res.data.courseClasses.total);
      })
      .catch(e => {
        notification.error({
          message: "Erro ao buscar Turmas",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    courseClasses: data,
    courseClassesTotal: total,
    courseClassesRefresh: fetchData,
    courseClassesLoading: isLoading,
  };
};
