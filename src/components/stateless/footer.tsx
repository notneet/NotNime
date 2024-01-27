import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/react";
import { MonitorMobileIcon } from "@nextui-org/shared-icons";
import { DateTime } from "luxon";
import { FC } from "react";

/**
 *
 * Char Gif
 * Megu: https://media.tenor.com/xLmnyEqMH44AAAAj/dance-anime.gif
 * Miku Guitar: https://media.tenor.com/yDLxbWD1rkcAAAAj/guitar-amp-electric-guitar.gif
 * Maou Mogu: https://media.tenor.com/oEeHIYvdsXcAAAAj/tensei-shitara-slime-datta-ken-milim.gif
 * MonoKuma: https://media.tenor.com/xxGJ4pwXaMoAAAAj/monokuma-danganronpa.gif
 * Amelia W Guitar: https://media.tenor.com/uE0_A3XCcdoAAAAj/dramaturgy-v-tuber.gif
 * Fubuki: https://media.tenor.com/CV64VE6W11gAAAAj/shirakami-fubuki-hololive.gif
 * AmeGura: https://media.tenor.com/2ilyLMvcxqAAAAAj/gawr-gura-amelia-watson.gif
 * Yae Miko: https://media.tenor.com/MJRDv3wSPm4AAAAj/yae-miko.gif
 */

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
