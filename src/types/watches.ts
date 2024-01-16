import { IPagition } from "./pagination";

export interface WatchesData {
  id: number;
  object_id: string;
  media_id: number;
  url: string;
  title: string;
  title_jp: string;
  title_en: string;
  type: string;
  score: number;
  status: string;
  duration: number;
  total_episode: number;
  published: Date;
  published_ts: number;
  season: string;
  genres: string;
  producers: string;
  description: string;
  cover_url: string;
}

export interface IWatches {
  data: WatchesData[];
  meta: IPagition;
}
