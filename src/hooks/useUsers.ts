import { IUser } from "@/interfaces/IUser";
import { userService } from "@/services/user.service";
import { parseFilters } from "@/utils/parseFilters";
import { notification } from "antd";
import { useEffect, useState } from "react";

interface UseUsersProps {
  page?: number;
  limit?: number;
  filters?: object;
  orderers?: string;
}

interface UseUsersResponse {
  users: IUser[];
  usersTotal: number;
  usersRefresh: () => void;
  usersLoading: boolean;
}

export const useUsers = ({
  page = 1,
  limit = 10,
  filters = {},
  orderers = "&orderBy=created_at&orderType=DESC",
}: UseUsersProps): UseUsersResponse => {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);

    const query = parseFilters(filters);

    userService
      .getAll(`?page=${page}&per_page=${limit}${query}${orderers}`)
      .then(res => {
        setData(res.data.users.result);
        setTotal(res.data.users.total);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao buscar usuários",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filters, orderers]);

  return {
    users: data,
    usersTotal: total,
    usersRefresh: fetchData,
    usersLoading: isLoading,
  };
};
