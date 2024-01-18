"use client";

import { title } from "@/components/primitives";
import { selectData } from "@/redux/worker/media.worker";
import { WatchService } from "@/services/watch";
import { Link } from "@nextui-org/link";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import clsx from "clsx";
import { useSelector } from "react-redux";

export default function AnimesPage() {
  const currMediaId = useSelector(selectData);

  const {
    data: animes,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["list-anime", currMediaId],
    queryFn: WatchService.getAll,
    retry: 1,
    select: ({ data }) => data,
  });

  console.log(
    ((error as unknown as AxiosError)?.response?.data as any)?.message
  );

  return (
    <div className="flex flex-col">
      <h1 className={clsx(title(), "pb-6")}>List Anime</h1>
      {!isPending ? (
        <ul>
          {animes?.map((it, i) => (
            <li key={i}>
              <Link href={it?.object_id}>{it.title_en}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <span>loading...</span>
      )}
    </div>
  );
}
