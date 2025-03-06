import { ICourse } from '@/interfaces/ICourse';
import { courseService } from '@/services/course.service';
import { useEffect, useState } from 'react';

interface UseCourseProps {
  id: string;
}

interface UseCourseResponse {
  course: ICourse | null;
  courseLoading: boolean;
  courseRefresh: () => void;
}

export const useCourse = ({ id }: UseCourseProps): UseCourseResponse => {
  const [data, setData] = useState<ICourse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    courseService
      .getById(id)
      .then((res) => {
        setData(res.data.course);
      })
      .catch(() => {
        console.log('Erro ao buscar curso');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    course: data,
    courseLoading: isLoading,
    courseRefresh: fetchData,
  };
};
