import { courseClasseService } from '@/services/course-classes.service';
import { useEffect, useState } from 'react';
import { ICourseClasse } from '../interfaces/ICourseClasse';

interface UseuseCourseClasseProps {
  id: string;
}

interface UseuseCourseClasseResponse {
  courseClasse: ICourseClasse | null;
  courseClasseLoading: boolean;
  courseClasseRefresh: () => void;
}

export const useCourseClasse = ({ id }: UseuseCourseClasseProps): UseuseCourseClasseResponse => {
  const [data, setData] = useState<ICourseClasse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    courseClasseService
      .getById(id)
      .then((res) => {
        setData(res.data.courseClass);
      })
      .catch(() => {

        console.log('Erro ao buscar turmas');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    courseClasse: data,
    courseClasseLoading: isLoading,
    courseClasseRefresh: fetchData,
  };
};
