"use client";

import { title } from "@/components/primitives";
import { getAllAnime } from "@/services/get-all-anime";
import { Link } from "@nextui-org/link";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

export default function AnimesPage() {
  const {
    data: animes,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["list-anime"],
    queryFn: getAllAnime,
    retry: 1,
  });

  return (
    <div className="flex flex-col">
      <h1 className={clsx(title(), "pb-6")}>List Anime</h1>
      {!isPending ? (
        <ul>
          {animes?.data?.map((it, i) => (
            <li key={i}>
              <Link href={it.url}>{it.title_en}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <span>loading...</span>
      )}
    </div>
  );
}
