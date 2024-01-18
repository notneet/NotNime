import { IMedias } from "../medias";
import { GeneralDummyData } from "./general";

export namespace MediaDummyData {
  export const findAll = (): IMedias => {
    return {
      data: [{ id: 1, name: "Otakudesu", url: "otakudesu.cam", url_old: null }],
      meta: GeneralDummyData.PageMeta,
    };
  };
}
