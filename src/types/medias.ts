import { IPagition } from "./pagination";

export interface MediaData {
  id: number;
  name: string;
  url: string;
  url_old: string | null;
}

export interface IMedias {
  data: MediaData[];
  meta: IPagition;
}
