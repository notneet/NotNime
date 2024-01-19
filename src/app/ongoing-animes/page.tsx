"use client";

import { title } from "@/components/primitives";
import { selectData } from "@/redux/worker/media.worker";
import { WatchService } from "@/services/watch";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

export default function OngoingAnimesPage() {
  const currMediaId = useSelector(selectData);
  const [pageNum, setPageNum] = useState<number>(1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const {
    data: animes,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: [
      "ongoing-anime",
      {
        media_id: currMediaId,
        page: pageNum,
        searchBy: "status",
        search: "Ongoing",
        title: searchTitle,
      },
    ],
    queryFn: WatchService.getAll,
    retry: 1,
    // select: ({ data }) => data,
  });

  const handlePageNum = (page: number) => {
    setPageNum(page);
  };

  const handelSearchTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className={clsx(title(), "pb-6")}>Ongoing Anime</h1>
      <Input type="search" label="Search Title" onChange={handelSearchTitle} />
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
