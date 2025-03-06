import { IStudent } from "@/interfaces/IStudent";
import { studentService } from "@/services/student.service";
import { useEffect, useState } from "react";

interface UseStudentByDocumentProps {
  cpf: string;
}

interface UseStudentByDocumentResponse {
  student: IStudent | null;
  studentLoading: boolean;
  studentRefresh: () => void;
}

export const useStudentByDocument = ({
  cpf,
}: UseStudentByDocumentProps): UseStudentByDocumentResponse => {
  const [data, setData] = useState<IStudent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    studentService
      .getAll(
        `?per_page=1&page=1&filterBy=cpf&filterType=eq&filterValue=${cpf}`
      )
      .then(res => {
        if (res.data.students.result.length > 0) {
          setData(res.data.students.result[0]);
        }
      })
      .catch(() => {
        console.log("Erro ao buscar usuário");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (cpf && cpf.length === 14) {
      fetchData();
    }
  }, [cpf]);

  return {
    student: data,
    studentLoading: isLoading,
    studentRefresh: fetchData,
  };
};
