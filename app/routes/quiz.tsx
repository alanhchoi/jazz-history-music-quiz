import { Link, useSearchParams } from "react-router";
import data from "../data.json";
import { useMemo, useState } from "react";
import { shuffle } from "fast-shuffle";
import Player from "../Player";
import { HomeIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const { listeningList } = data;

function getScope(scopeParam: string) {
  switch (scopeParam) {
    case "exam1":
      return [1, 22];
    case "exam2":
      return [23, 44];
    case "exam3":
      return [45, 66];
    default:
      return [1, 66];
  }
}

export default function Quiz() {
  const [searchParams] = useSearchParams();

  const scopeParam = searchParams.get("scope") || "final";
  const defaultRandomStartTime = searchParams.get("randomStartTime") === "on";
  const [current, setCurrent] = useState(0);
  const [randomStartTime, setRandomStartTime] = useState(
    defaultRandomStartTime,
  );

  const [scopeStart, scopeEnd] = getScope(scopeParam);
  const listLength = scopeEnd - scopeStart + 1;

  const shuffledFilteredList = useMemo(() => {
    const filteredList = listeningList.slice(scopeStart - 1, scopeEnd);
    return shuffle(filteredList);
  }, [scopeStart, scopeEnd]);

  const currentItem = shuffledFilteredList[current];

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="flex items-stretch md:pe-2 border-b">
        <Link
          to="/"
          className="flex flex-none items-center gap-1 hover:bg-neutral-950 dark:hover:bg-neutral-800 py-2 ps-2 pe-3 border-e font-medium hover:text-white text-sm tracking-wide cursor-pointer neutral-800"
        >
          <HomeIcon className="size-5" />
          Home
        </Link>
        <div className="flex flex-col md:flex-1 justify-center self-stretch px-2 py-1 text-xs">
          <div className="flex-1 font-medium uppercase tracking-wide">
            Scope: tracks {scopeStart}–{scopeEnd}
          </div>
          <label
            htmlFor="randomStartTime"
            className="flex items-center self-stretch gap-1.5 text-neutral-600 dark:text-neutral-300"
          >
            <input
              id="randomStartTime"
              name="randomStartTime"
              type="checkbox"
              checked={randomStartTime}
              onChange={(event) => {
                setRandomStartTime(event.target.checked);
              }}
            />
            <span>Play at a random point</span>
          </label>
        </div>
        <div className="flex-1 md:flex-none self-center px-4 font-medium text-sm md:text-lg text-end uppercase tracking-wide">
          {current + 1} / {listLength}
        </div>
        <button
          type="button"
          onClick={() => setCurrent(current - 1)}
          disabled={current === 0}
          className="bottom-[env(safe-area-inset-bottom)] left-0 absolute md:relative flex items-center gap-1 dark:enabled:hover:bg-neutral-800 enabled:hover:bg-neutral-950 disabled:opacity-25 py-4 md:py-2 ps-4 md:ps-1 pe-8 md:pe-3 md:font-medium enabled:hover:text-white md:text-sm text-lg enabled:cursor-pointer"
        >
          <ChevronLeftIcon className="size-5" />
          Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrent(current + 1)}
          disabled={current === listLength - 1}
          className="right-0 bottom-[env(safe-area-inset-bottom)] absolute md:relative flex items-center gap-1 dark:enabled:hover:bg-neutral-800 enabled:hover:bg-neutral-950 disabled:opacity-25 py-4 md:py-2 ps-8 md:ps-3 pe-4 md:pe-1 md:font-medium enabled:hover:text-white md:text-sm text-lg enabled:cursor-pointer"
        >
          Next
          <ChevronRightIcon className="size-5" />
        </button>
        <div className="md:hidden bottom-[env(safe-area-inset-bottom)] left-1/2 absolute py-4 text-lg tracking-wide -translate-x-1/2">
          {current + 1} / {listLength}
        </div>
      </header>
      <div className="flex flex-col flex-1 justify-center items-center">
        <Player
          key={currentItem.youtubeId}
          tune={currentItem}
          randomStartTime={randomStartTime}
        />
      </div>
    </div>
  );
}
