"use client";

import { CardList } from "@/components/stateless/CardList";
import { TitleTop } from "@/components/stateless/Title";
import { selectData } from "@/redux/worker/media.worker";
import { WatchService } from "@/services/watch";
import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/pagination";
import { useQuery } from "@tanstack/react-query";
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
    <div>
      <TitleTop name="Willing to Wait?" caption="Avoid spoilers" />

      <Input
        placeholder="Search title"
        radius="full"
        className="pt-6 max-w-72"
        onChange={handelSearchTitle}
      />

      <CardList
        title="Anime Ongoing"
        datas={animes}
        isPending={isPending}
        urlFullPage="ongoing-animes"
        useNavigateButton={false}
      />

      <Pagination
        key="md"
        total={animes?.meta?.pageCount!}
        initialPage={1}
        size="md"
        radius="full"
        className="pt-5 flex items-center justify-center"
        showControls
        disableAnimation
        hidden={!animes?.meta?.itemCount}
        isDisabled={isPending}
        onChange={handlePageNum}
      />
    </div>
  );
}
