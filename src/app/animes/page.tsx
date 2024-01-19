"use client";

import { title } from "@/components/primitives";
import { selectData } from "@/redux/worker/media.worker";
import { WatchService } from "@/services/watch";
import { Link } from "@nextui-org/link";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AnimesPage() {
  const currMediaId = useSelector(selectData);
  const [pageNum, setPageNum] = useState<number>(1);

  const {
    data: animes,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["list-anime", { media_id: currMediaId, page: pageNum }],
    queryFn: WatchService.getAll,
    retry: 1,
    // select: ({ data }) => data,
  });

  const handlePageNum = (page: number) => {
    console.log(page);
    setPageNum(page);
  };

  // console.log(
  //   ((error as unknown as AxiosError)?.response?.data as any)?.message
  // );

  return (
    <div className="flex flex-col items-center">
      <h1 className={clsx(title(), "pb-6")}>List Anime</h1>
      {!isPending ? (
        <ul>
          {animes?.data?.map((it, i) => (
            <li key={i}>
              <Link href={it?.object_id}>{it.title_en}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <span>
          <Spinner />
        </span>
      )}
      <Pagination
        key="md"
        total={animes?.meta?.pageCount!}
        initialPage={1}
        size="md"
        className="pt-5"
        showControls
        disableAnimation
        hidden={!animes?.meta?.itemCount}
        isDisabled={isPending}
        onChange={handlePageNum}
      />
    </div>
  );
}
