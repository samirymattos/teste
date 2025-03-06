import { ICourseCategory } from '@/interfaces/ICourseCategory';
import { courseCategoryService } from '@/services/course-category.service';
import { useEffect, useState } from 'react';

interface UseCourseCategoryProps {
  id: string;
}

interface UseCourseCategoryResponse {
  courseCategory: ICourseCategory | null;
  courseCategoryLoading: boolean;
  courseCategoryRefresh: () => void;
}

export const useCourseCategory = ({ id }: UseCourseCategoryProps): UseCourseCategoryResponse => {
  const [data, setData] = useState<ICourseCategory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    courseCategoryService
      .getById(id)
      .then((res) => {
        setData(res.data.courseCategory);
      })
      .catch(() => {
        console.log('Erro ao buscar categoria de curso');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    courseCategory: data,
    courseCategoryLoading: isLoading,
    courseCategoryRefresh: fetchData,
  };
};
