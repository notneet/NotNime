"use client";

import { CardJumbo } from "@/components/stateless/CardJumbo";
import { CardList } from "@/components/stateless/CardList";
import { TitleTop } from "@/components/stateless/Title";
import { selectData } from "@/redux/worker/media.worker";
import { WatchService } from "@/services/watch";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function Home() {
  const currMediaId = useSelector(selectData);

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
        take: 2,
        random: true,
      },
    ],
    queryFn: WatchService.getAll,
    retry: 1,
  });

  const {
    data: animes,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: [
      "list-anime",
      {
        media_id: currMediaId,
        take: 10,
        searchBy: "status",
        search: "Ongoing",
      },
    ],
    queryFn: WatchService.getAll,
    retry: 1,
  });

  const {
    data: popularAnimes,
    error: popularError,
    isError: popularIsError,
    isPending: popularIsPending,
  } = useQuery({
    queryKey: [
      "ongoing-anime",
      {
        media_id: currMediaId,
        sortBy: "score",
        order: "DESC",
        take: 10,
      },
    ],
    queryFn: WatchService.getAll,
    retry: 1,
  });

  return (
    <section className="pt-10 pb-28">
      <TitleTop name="Explore" caption="who knows you might like it" />

      {/* Card Jumbotron */}
      <section className="flex flex-col lg:flex-row pt-10 gap-3">
        {!randomIsPending ? (
          <>
            {randomAnimes?.data?.map((it, i) => (
              <CardJumbo
                key={i}
                postId={it?.object_id}
                postTitle={it.title_en}
                postDesc={it?.description}
                imageUrl={it?.cover_url}
                imageAlt={it?.title_en}
                rating={it?.score}
                genres={it?.genres?.split(/,\s*/)}
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </section>

      {/* New Release */}
      <CardList
        title="New Relase"
        datas={animes}
        isPending={isPending}
        urlFullPage="ongoing-animes"
      />

      {/* Popular */}
      <CardList
        title="Popular"
        datas={popularAnimes}
        isPending={popularIsPending}
        urlFullPage="animes"
      />
    </section>
  );
}
