export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "NotNime",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "List Anime",
      href: "/animes",
    },
    {
      label: "Ongoing Anime",
      href: "/ongoing-animes",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "List Anime",
      href: "/animes",
    },
    {
      label: "Ongoing Anime",
      href: "/ongoing-animes",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/notneet/notnime",
    twitter: "",
    docs: "https://api-crawler.notneet.my.id/docs",
    discord: "",
    sponsor: "",
  },
};
