import { ISupplier } from "@/interfaces/ISuppliers";
import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { studentService } from './../services/student.service';

interface UseStudentsProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseStudentsResponse {
  students: ISupplier[];
  studentsTotal: number;
  studentsRefresh: () => void;
  studentsLoading: boolean;
}

export const useStudents = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseStudentsProps): UseStudentsResponse => {
  const [data, setData] = useState<ISupplier[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    studentService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.students.result);
        setTotal(res.data.students.total);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar alunos",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    students: data,
    studentsTotal: total,
    studentsRefresh: fetchData,
    studentsLoading: isLoading,
  };
};
