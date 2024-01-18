import apiClient from "@/config/api";
import { IWatcheDetail, IWatches } from "@/types/watches";
import { QueryOptions } from "@tanstack/react-query";

export namespace WatchService {
  export const getAll = async ({
    queryKey,
  }: QueryOptions<{ media_id: number }>) => {
    const { data } = await apiClient.get<IWatches>("watches", {
      params: { media_id: queryKey![1] || 1 },
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
