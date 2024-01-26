"use client";

import { title } from "@/components/stateless/primitives";
import { WatchService } from "@/services/watch";
import { DATE_FORMAT } from "@/types";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

export default function DetailAnimePage({
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
    <div className="flex flex-col md:flex-row items-center">
      <aside className="flex flex-col items-center w-3/5">
        <h1 className={title()}>{anime?.title_en}</h1>
        <Image src={anime?.cover_url} className="py-4" alt={anime?.title_en} />
        <p>{anime?.description}</p>
      </aside>
      <aside className="w-2/5 sm:pt-2 flex flex-col gap-5 items-center">
        <div>
          <h5 className="text-lg font-semibold">List Episode</h5>
          <div className="pt-2">
            <Link href={`${anime?.object_id}/1`}>
              <Button>
                Example Episode 1 (Kono Subarashii Sekai ni Bakuen wo!)
              </Button>
            </Link>
          </div>
        </div>
        <Divider className="my-1" />
        <div>
          <p>
            Published:{" "}
            <time>
              {DateTime.fromSeconds(anime?.published_ts || 0).toFormat(
                DATE_FORMAT
              )}
            </time>
          </p>
          <p>Title Japan: {anime?.title_jp}</p>
          <p>Score: {anime?.score}</p>
          <p>Type: {anime?.type}</p>
          <p>Status: {anime?.status}</p>
          <p>Duration: {anime?.duration} min</p>
          <p>Total Episode: {anime?.total_episode}</p>
          <p>Genres: {anime?.genres}</p>
          <p>Producers: {anime?.producers}</p>
        </div>
      </aside>
    </div>
  );
}
