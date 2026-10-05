import { Link, useSearchParams } from "react-router";
import data from "../data.json";
import { useMemo, useState } from "react";
import { shuffle } from "fast-shuffle";
import Player from "../Player.client";
import { HomeIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import type { Route } from "./+types/home";
import { getScope } from "../getScope";
import CurrentPlayingNumber from "~/CurrentPlayingNumber";

const { listeningList } = data;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "34400 Listening List" },
    { name: "description", content: "" },
  ];
}

export default function Quiz() {
  const [searchParams] = useSearchParams();

  const scopeParam = searchParams.get("scope") || "final";
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const [scopeStart, scopeEnd] = getScope(scopeParam);
  const listLength = scopeEnd - scopeStart + 1;

  const shuffledFilteredList = useMemo(() => {
    const filteredList = listeningList.slice(scopeStart - 1, scopeEnd);
    return shuffle(filteredList);
  }, [scopeStart, scopeEnd]);

  const currentItem = shuffledFilteredList[current];

  const playNext = () => {
    setCurrent(current + 1);
  };

  const playPrevious = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="top-0 right-0 bottom-0 left-0 fixed flex flex-col">
      <header className="flex flex-none items-stretch py-4 md:pe-2 border-neutral-200 dark:border-neutral-700 border-b">
        <Link
          to="/"
          className="flex flex-none items-center gap-1 hover:bg-neutral-950 dark:hover:bg-neutral-800 py-2 ps-2 pe-3 font-medium hover:text-white text-sm tracking-wide cursor-pointer neutral-800"
        >
          <ChevronLeftIcon className="-me-1 size-5" />
          <HomeIcon className="size-5" />
          <span className="sr-only md:not-sr-only">Home</span>
        </Link>
        <div className="flex flex-col flex-1 justify-center items-start self-center py-1 ps-3 pe-2 min-w-0 text-sm">
          <div className="flex-1 font-semibold text-md tracking-wide">
            Tracks {scopeStart}–{scopeEnd}
          </div>
          <div className="flex has-hover:bg-neutral-100 ps-1 rounded-xs font-medium">
            <input
              className="accent-amber-600"
              type="checkbox"
              id="autoplay"
              onChange={(event) => {
                setAutoPlay(event.target.checked);
              }}
            />
            <label htmlFor="autoplay" className="px-1">
              Autoplay
            </label>
          </div>
        </div>
        <CurrentPlayingNumber
          current={current}
          total={listLength}
          className="flex-none md:flex-none self-center px-4 font-medium text-sm md:text-lg text-end uppercase tracking-wide"
        />
        <button
          type="button"
          onClick={playPrevious}
          disabled={current === 0}
          className="hidden md:flex items-center gap-1 dark:enabled:hover:bg-neutral-800 enabled:hover:bg-neutral-950 disabled:opacity-25 py-4 md:py-2 ps-4 md:ps-1 pe-8 md:pe-3 md:font-medium enabled:hover:text-white md:text-sm text-lg enabled:cursor-pointer"
        >
          <ChevronLeftIcon className="size-5" />
          Previous
        </button>
        <button
          type="button"
          onClick={playNext}
          disabled={current === listLength - 1}
          className="hidden md:flex items-center gap-1 dark:enabled:hover:bg-neutral-800 enabled:hover:bg-neutral-950 disabled:opacity-25 py-4 md:py-2 ps-8 md:ps-3 pe-4 md:pe-1 md:font-medium enabled:hover:text-white md:text-sm text-lg enabled:cursor-pointer"
        >
          Next
          <ChevronRightIcon className="size-5" />
        </button>
      </header>
      <div className="flex flex-col flex-1 justify-center items-center py-8 overflow-y-auto">
        {Player != null && (
          <Player
            key={currentItem.youtubeId}
            tune={currentItem}
            autoPlay={autoPlay}
          />
        )}
      </div>
      <div className="md:hidden pb-[env(safe-area-inset-bottom)] flex flex-none w-full">
        <div className="flex-1 min-w-0 overflow-hidden">
          <button
            type="button"
            onClick={playPrevious}
            disabled={current === 0}
            className="flex items-center gap-1 dark:enabled:hover:bg-neutral-800 enabled:hover:bg-neutral-950 disabled:opacity-25 py-4 ps-4 pe-8 min-w-0 max-w-full enabled:hover:text-white text-lg enabled:cursor-pointer"
          >
            <ChevronLeftIcon className="flex-none size-5" />
            <span className="overflow-hidden text-ellipsis">Previous</span>
          </button>
        </div>

        <CurrentPlayingNumber
          className="mx-auto py-4 text-lg tracking-wide"
          current={current}
          total={listLength}
        />

        <div className="flex-1 min-w-0">
          <button
            type="button"
            onClick={playNext}
            disabled={current === listLength - 1}
            className="flex flex-row-reverse items-center gap-1 dark:enabled:hover:bg-neutral-800 enabled:hover:bg-neutral-950 disabled:opacity-25 ms-auto py-4 ps-8 pe-4 min-w-0 max-w-full overflow-hidden enabled:hover:text-white md:text-sm text-lg enabled:cursor-pointer"
          >
            <ChevronRightIcon className="flex-none size-5" />
            <span className="overflow-hidden text-ellipsis">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}
