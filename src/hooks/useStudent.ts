import { useEffect, useState } from "react";
import { studentService } from './../services/student.service';
import { IStudent } from "@/interfaces/IStudent";

interface UseStudentProps {
  id: string;
}

interface UseStudentResponse {
  student: IStudent | null;
  studentLoading: boolean;
  studentRefresh: () => void;
}

export const useStudent = ({ id }: UseStudentProps): UseStudentResponse => {
  const [data, setData] = useState<IStudent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    studentService
      .getById(id)
      .then(res => {
        setData(res.data.student);
      })
      .catch(() => {
        console.log("Erro ao buscar aluno");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    student: data,
    studentLoading: isLoading,
    studentRefresh: fetchData,
  };
};
