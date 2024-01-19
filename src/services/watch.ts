import apiClient from "@/config/api";
import { IWatcheDetail, IWatches } from "@/types/watches";
import { QueryOptions } from "@tanstack/react-query";

export type PaginationItem = {
  media_id: number;
  page: number;
};

export namespace WatchService {
  export const getAll = async ({ queryKey }: QueryOptions) => {
    const searchItem = queryKey![1] as PaginationItem;

    const { data } = await apiClient.get<IWatches>("watches", {
      params: {
        media_id: searchItem?.media_id || 1,
        page: searchItem?.page,
        take: 50,
      },
    });

    return data;
  };

  export const getOne = async ({ queryKey }: QueryOptions) => {
    const { data } = await apiClient.get<IWatcheDetail>(
      `watches/${queryKey![1]}`,
      {
        params: { media_id: 1 },
      }
    );

    return data;
  };
}
