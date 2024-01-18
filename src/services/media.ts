import apiClient from "@/config/api";
import { IMedias } from "@/types/medias";
import { QueryOptions } from "@tanstack/react-query";

export namespace MediaService {
  export const getAll = async ({ queryKey }: QueryOptions) => {
    const { data } = await apiClient.get<IMedias>("medias");

    return data;
  };
}
