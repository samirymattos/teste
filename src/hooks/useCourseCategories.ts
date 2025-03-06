import { ICourseCategory } from '@/interfaces/ICourseCategory';
import { courseCategoryService } from '@/services/course-category.service';
import { parseFilters } from '@/utils/parseFilters';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

interface UseCourseCategoriesProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseCourseCategoriesResponse {
  courseCategories: ICourseCategory[];
  courseCategoriesTotal: number;
  courseCategoriesRefresh: () => void;
  courseCategoriesLoading: boolean;
}

export const useCourseCategories = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = '&orderBy=created_at&orderType=DESC',
}: UseCourseCategoriesProps): UseCourseCategoriesResponse => {
  const [data, setData] = useState<ICourseCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    courseCategoryService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then((res) => {
        setData(res.data.courseCategories.result);
        setTotal(res.data.courseCategories.total);
      })
      .catch(() => {
        notification.error({
          message: 'Erro ao buscar categorias de cursos',
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    courseCategories: data,
    courseCategoriesTotal: total,
    courseCategoriesRefresh: fetchData,
    courseCategoriesLoading: isLoading,
  };
};
