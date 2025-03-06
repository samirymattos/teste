import { parseFilters } from '@/utils/parseFilters';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { ICourse } from './../interfaces/ICourse';
import { courseService } from './../services/course.service';

interface UseCoursesProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseCoursesResponse {
  courses: ICourse[];
  coursesTotal: number;
  coursesRefresh: () => void;
  coursesLoading: boolean;
}

export const useCourses = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = '&orderBy=created_at&orderType=DESC',
}: UseCoursesProps): UseCoursesResponse => {
  const [data, setData] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    courseService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then((res) => {
        setData(res.data.courses.result);
        setTotal(res.data.courses.total);
      })
      .catch(() => {
        notification.error({
          message: 'Erro ao buscar cursos',
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    courses: data,
    coursesTotal: total,
    coursesRefresh: fetchData,
    coursesLoading: isLoading,
  };
};
