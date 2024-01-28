import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import clsx from "clsx";
import { FC } from "react";
import { StarIcon } from "./icons";
import { title } from "./primitives";

export interface CardJumboProps {
  postId: string;
  postTitle: string;
  postDesc: string;
  imageUrl: string;
  imageAlt: string;
  rating: number;
  genres?: string[];
}

export const CardJumbo: FC<CardJumboProps> = ({
  postTitle,
  postDesc,
  postId,
  imageUrl,
  imageAlt,
  genres,
  rating,
}) => {
  return (
    <div className="w-full h-auto bg-gradient-to-r from-dark-foreground-main/20 to-light-foreground-main/20 dark:from-light-foreground-main/60 dark:to-dark-foreground-main/60 items-center p-5 flex flex-row-reverse justify-between rounded-xl">
      <Link href={postId}>
        <Image className="w-40 h-60" src={imageUrl} alt={imageAlt} />
      </Link>
      <div className="w-2/3">
        <span className="flex gap-1">
          <Link
            className={clsx(title({ size: "card" }))}
            href={postId}
            underline="hover"
          >
            {postTitle}
          </Link>
          <span className="flex items-center gap-1">
            <StarIcon />
            <p>{rating}</p>
          </span>
        </span>
        <ScrollShadow hideScrollBar className="py-2 h-40 text-base lg:text-sm">
          {postDesc}
        </ScrollShadow>
        <span className="flex flex-wrap gap-2 w-full">
          {genres?.map((genre, i) => (
            <Chip key={i} size="md" color="primary" variant="flat">
              {genre}
            </Chip>
          ))}
        </span>
      </div>
    </div>
  );
};
