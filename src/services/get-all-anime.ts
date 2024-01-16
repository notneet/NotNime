import apiClient from "@/config/api";
import { IWatches } from "@/types/watches";

export const getAllAnime = async () => {
  const { data } = await apiClient.get<IWatches>("watches", {
    params: { media_id: 1 },
  });

  return data;
};
