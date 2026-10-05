import type { Route } from "./+types/home";
import type { SubmitEventHandler } from "react";
import { useNavigate } from "react-router";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "34400 Listening List Music Quiz" },
    { name: "description", content: "" },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  const startQuiz: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchParams = new URLSearchParams();

    const randomStartTime = formData.get("randomStartTime");
    searchParams.append("scope", String(formData.get("scope")));

    if (randomStartTime === "on") {
      searchParams.append("randomStartTime", "on");
    }

    navigate("/quiz?" + searchParams.toString());
  };

  return (
    <main className="flex flex-col px-4 md:px-8 pt-8 pb-4">
      <header className="mb-8">
        <h1 className="font-bold text-3xl md:text-5xl text-pretty">
          Jazz History Listening List Music Quiz
        </h1>
      </header>
      <form
        className="flex flex-col flex-1 items-start gap-4 max-w-96"
        onSubmit={startQuiz}
      >
        <div className="flex flex-col items-stretch w-full">
          <label
            className="mb-1 font-semibold text-sm uppercase tracking-wider"
            htmlFor="scope"
          >
            Select Scope
          </label>
          <div className="relative w-full">
            <select
              id="scope"
              name="scope"
              className="bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-sm w-full dark:text-neutral-400 appearance-none cursor-pointer"
              defaultValue="exam2"
            >
              <option value="exam1">Track 1–22 (Exam 1)</option>
              <option value="exam2">Track 23–44 (Exam 2)</option>
              <option value="exam3">Track 23–44 (Exam 3)</option>
              <option value="final">Track 1–66 (Final)</option>
            </select>
            <ChevronUpDownIcon className="top-1/2 right-2 absolute size-5 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-3 dark:has-checked:bg-transparent has-checked:bg-neutral-100 py-2 ps-4 border border-neutral-300 dark:border-neutral-400 rounded-sm w-full dark:has-checked:text-white dark:text-neutral-400">
          <input id="randomStartTime" name="randomStartTime" type="checkbox" />
          <label className="flex-1" htmlFor="randomStartTime">
            Play at a random point
          </label>
        </div>

        <button
          type="submit"
          className="hover:bg-neutral-800 dark:hover:bg-transparent mt-2 py-3 border border-neutral-800 dark:border-neutral-400 rounded-full w-full hover:text-white cursor-pointer"
        >
          Start
        </button>
      </form>
    </main>
  );
}
