import { IWatches } from "@/types/watches";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";
import { Tooltip } from "@nextui-org/tooltip";
import { FC } from "react";
import { TitleDivider } from "./Title";

export interface CardListProps {
  title: string;
  isPending: boolean;
  datas: IWatches | undefined;
  urlFullPage?: string;
  useNavigateButton?: boolean;
}

export const CardList: FC<CardListProps> = ({
  title,
  datas,
  isPending,
  urlFullPage,
  useNavigateButton,
}) => {
  return (
    <section className="pt-10">
      <TitleDivider name={title} />

      {!isPending ? (
        <section className="flex flex-wrap gap-4 items-center justify-center pt-5">
          {datas?.data?.map((anime, i) => (
            <Tooltip
              key={i}
              placement="bottom"
              content={anime?.title_en}
              color="foreground"
            >
              <Link href={`/${anime?.object_id}`}>
                <Image
                  src={anime?.cover_url}
                  alt={anime?.title_en}
                  className="w-32 h-44 hover:scale-105"
                />
              </Link>
            </Tooltip>
          ))}

          {useNavigateButton ?? (
            <Button
              href={urlFullPage}
              as={Link}
              radius="full"
              color="primary"
              variant="solid"
            >
              See All
            </Button>
          )}
        </section>
      ) : (
        <Spinner />
      )}
    </section>
  );
};
