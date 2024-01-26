import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/react";
import { MonitorMobileIcon } from "@nextui-org/shared-icons";
import { DateTime } from "luxon";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="dark:bg-light-foreground-main bg-dark-foreground-main/10 py-8 px-5">
      <h6 className="font-bold text-lg dark:text-light-main">NotNime</h6>
      <span className="flex flex-row gap-1 text-xs dark:text-light-main">
        <time>&#169;{DateTime.now().toFormat("yyyy")}</time>
        <p> | </p>
        <p>Made with ❤️️, supported by waifu</p>
        <Link isExternal href={siteConfig.links.docs} title="See API Doc">
          <MonitorMobileIcon className="text-default-500" />
        </Link>
      </span>
    </footer>
  );
};
