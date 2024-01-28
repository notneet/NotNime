"use client";

import { VideoControl } from "@/components/statefull/VideoControl";
import { CardList } from "@/components/stateless/CardList";
import { title } from "@/components/stateless/primitives";
import { BASEURL_ASSET } from "@/config/env";
import { selectData } from "@/redux/worker/media.worker";
import { WatchService } from "@/services/watch";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useSelector } from "react-redux";

export default function EpisodeAnimePage({
  params,
}: {
  params: { anime: string; episode: string };
}) {
  const currMediaId = useSelector(selectData);

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

  const {
    data: randomAnimes,
    error: randomError,
    isError: randomIsError,
    isPending: randomIsPending,
  } = useQuery({
    queryKey: [
      "random-anime",
      {
        media_id: currMediaId,
        take: 10,
        random: true,
      },
    ],
    queryFn: WatchService.getAll,
    retry: 1,
  });

  const numEpisode = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  if (isPending) return <Spinner />;

  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:w-3/4">
          <h1 className={clsx(title())}>{anime?.title_en}</h1>
          {anime?.object_id && (
            <VideoControl
              className="relative py-5"
              streamUrl={`${BASEURL_ASSET}/anime/video/otakudesu/Kono_Subarashii_Sekai_ni_Bakuen_wo_1.mkv.mp4`}
            />
          )}
        </aside>
        <aside className="w-full lg:w-1/4 pt-0 lg:pt-10">
          {/* List Episode */}
          {anime?.object_id && (
            <ScrollShadow
              className="max-w-80 max-h-48 mt-0 lg:mt-5"
              hideScrollBar
            >
              <span className="flex flex-wrap  gap-1.5">
                {numEpisode?.map((it, i) => (
                  <Button
                    key={i}
                    href={`${it}`}
                    as={Link}
                    radius="full"
                    isDisabled={it === Number(params.episode)}
                    variant="solid"
                  >
                    {it}
                  </Button>
                ))}
              </span>
            </ScrollShadow>
          )}
        </aside>
      </div>

      {/* Random */}
      <CardList
        title="Quick Thru"
        datas={randomAnimes}
        isPending={randomIsPending}
        useNavigateButton={false}
      />
    </section>
  );
}
