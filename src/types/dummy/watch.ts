import { IWatcheDetail, IWatches } from "../watches";
import { GeneralDummyData } from "./general";

export namespace WatchDummyData {
  export const findOne = (): IWatcheDetail => {
    return {
      data: {
        id: 0,
        object_id: "",
        media_id: 0,
        url: "",
        title: "",
        title_jp: "",
        title_en: "",
        type: "",
        score: 0,
        status: "",
        duration: 0,
        total_episode: 0,
        published: new Date(),
        published_ts: 0,
        season: "",
        genres: "",
        producers: "",
        description: "",
        cover_url: "",
        streams: [],
      },
    };
  };

  export const findAll = (): IWatches => {
    return {
      data: [findOne().data],
      meta: GeneralDummyData.PageMeta,
    };
  };
}
