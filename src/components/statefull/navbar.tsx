"use client";

import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import clsx from "clsx";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/statefull/theme-switch";
import { GithubIcon, NewLogo } from "@/components/stateless/icons";

import { selectData, setMedia } from "@/redux/worker/media.worker";
import { MediaService } from "@/services/media";
import { MediaDummyData } from "@/types/dummy/media";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Kbd } from "@nextui-org/kbd";
import { useQuery } from "@tanstack/react-query";
import { Key, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectData);

  const {
    data: medias,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["medias"],
    queryFn: MediaService.getAll,
    retry: 1,
    select: ({ data }) => data,
    initialData: MediaDummyData.findAll,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();

        const inputEl: HTMLInputElement | null = document.querySelector(
          'input[aria-label="Source Media"]'
        );

        if (inputEl) {
          inputEl.focus();
        }
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const handleChangeMedia = (key: Key) => {
    dispatch(setMedia(+key.toString()));
  };

  const inputMediaIdComp = (
    <Autocomplete
      aria-label="Source Media"
      label="Source Media"
      placeholder="Search an media"
      radius="full"
      clearIcon={<></>}
      defaultInputValue={medias?.find((it) => it?.id === 1)?.name}
      onSelectionChange={handleChangeMedia}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["ctrl"]}>
          K
        </Kbd>
      }
    >
      {medias?.map((media) => (
        <AutocompleteItem key={media.id}>{media.name}</AutocompleteItem>
      ))}
    </Autocomplete>
  );

  return (
    <>
      <NextUINavbar
        maxWidth="xl"
        position="sticky"
        className="border-b-1 dark:border-b-dark-foreground-main/40"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <NewLogo />
              <p className="font-bold text-inherit">{siteConfig.name}</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden lg:flex">{inputMediaIdComp}</NavbarItem>
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          {inputMediaIdComp}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
