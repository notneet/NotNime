"use client";

import { title } from "@/components/primitives";
import { WatchService } from "@/services/watch";
import { useQuery } from "@tanstack/react-query";

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

  if (isPending) return <span>Loading...</span>;

  return (
    <div>
      <h1 className={title()}>{anime?.title_en}</h1>
    </div>
  );
}
