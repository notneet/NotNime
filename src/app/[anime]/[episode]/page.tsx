"use client";

import { VideoControl } from "@/components/VideoControl";
import { title } from "@/components/primitives";
import { BASEURL_ASSET } from "@/config/env";
import { WatchService } from "@/services/watch";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

export default function EpisodeAnimePage({
  params,
}: {
  params: { anime: string };
}) {
  const {
    data: anime,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["detail-anime", params.anime],
    queryFn: WatchService.getOne,
    retry: 1,
    select: ({ data }) => data,
  });

  if (isPending) return <Spinner />;

  return (
    <div>
      <h1 className={clsx(title())}>{anime?.title_en}</h1>
      <VideoControl
        className="relative py-5"
        streamUrl={`${BASEURL_ASSET}/anime/video/otakudesu/Kono_Subarashii_Sekai_ni_Bakuen_wo_1.mkv.mp4`}
      />
    </div>
  );
}
