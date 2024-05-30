"use client";

import { subtitle, title } from "@/components/stateless/primitives";
import { WatchService } from "@/services/watch";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
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

  const numEpisode = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  const rows = [
    {
      key: "1",
      item: "Rating",
      value: anime?.score,
    },
    {
      key: "2",
      item: "Type",
      value: anime?.type,
    },
    {
      key: "3",
      item: "Status",
      value: anime?.status,
    },
    {
      key: "4",
      item: "Duration",
      value: `${anime?.duration} min.`,
    },
    {
      key: "5",
      item: "Total Episode",
      value: anime?.total_episode,
    },
    {
      key: "6",
      item: "Published",
      value: DateTime.fromSeconds(anime?.published_ts || 0).toFormat(
        "yyyy MMM dd hh:mm"
      ),
    },
  ];

  const columns: { key: string; label: string }[] = [
    {
      key: "item",
      label: "ITEM",
    },
    {
      key: "value",
      label: "VALUE",
    },
  ];

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col lg:flex-row gap-10 justify-center">
      <aside className="w-full lg:w-1/6 flex flex-col gap-3 items-center">
        <Image
          src={anime?.cover_url}
          alt={anime?.title_en}
          className="h-80 lg:w-64 w-56 mx-auto"
        />

        <Button
          href="https://github.com/notneet/notnime"
          as={Link}
          radius="full"
          color="primary"
          variant="solid"
          className="w-full"
        >
          Download Batch
        </Button>

        <span className="flex flex-wrap gap-2 w-full">
          {anime?.genres?.split(/,\s*/)?.map((genre, i) => (
            <Chip key={i} size="md" color="primary" variant="flat">
              {genre}
            </Chip>
          ))}
        </span>
      </aside>
      <aside className="w-full lg:w-5/6">
        <h2 className={clsx(title({ size: "card" }))}>{anime?.title_en}</h2>

        {/* List Episode */}
        <ScrollShadow className="max-w-80 max-h-48 mt-5" hideScrollBar>
          <span className="flex flex-wrap  gap-1.5">
            {numEpisode?.map((it, i) => (
              <Button
                key={i}
                href={`${anime?.object_id}/${it}`}
                as={Link}
                radius="full"
                // color="primary"
                variant="solid"
              >
                {it}
              </Button>
            ))}
          </span>
        </ScrollShadow>

        {/* List Batch */}
        {anime?.streams && anime?.streams?.length > 0 && (
          <>
            <h3 className={clsx(subtitle({ size: "card" }), "py-5")}>
              List Batch
            </h3>
            <ul>
              {anime?.streams?.map((stream, i) => (
                <li key={i} className="flex items-center gap-2 my-2">
                  <ul className="flex items-center gap-2">
                    {Object.entries(stream?.providers)?.map(
                      ([providerName, mirror], j) => (
                        <li key={j}>
                          <Link
                            href={mirror}
                            as={Link}
                            className="leading-3"
                            target="_blank"
                          >
                            {providerName}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                  <span className="text-sm font-semibold">
                    {stream?.quality}p
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Description */}
        <h3 className={clsx(subtitle({ size: "card" }), "py-5")}>
          Description
        </h3>
        <p>{anime?.description}</p>
        <Divider className="my-5" />

        <Table shadow="none" hideHeader>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </aside>
    </div>
  );
}
