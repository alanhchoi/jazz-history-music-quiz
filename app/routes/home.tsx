import type { Route } from "./+types/home";
import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "34400 Listening List" },
    { name: "description", content: "" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [scope, setScope] = useState("exam3");

  const startQuiz: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams();
    searchParams.append("scope", scope);
    navigate("/quiz?" + searchParams.toString());
  };

  const navigateToPlay = () => {
    const searchParams = new URLSearchParams();
    searchParams.append("scope", scope);
    navigate("/play?" + searchParams.toString());
  };

  return (
    <main className="flex flex-col md:items-center px-4 md:px-8 pt-8 pb-4">
      <header className="mb-8">
        <h1 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl text-pretty">
          Jazz History Listening List
        </h1>
      </header>
      <form
        className="flex flex-col flex-1 items-start gap-4 md:w-96 max-w-96"
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
              value={scope}
              onChange={(event) => {
                setScope(event.target.value);
              }}
            >
              <option value="exam1">Track 1–22 (Exam 1)</option>
              <option value="exam2">Track 23–44 (Exam 2)</option>
              <option value="exam3">Track 45–66 (Exam 3)</option>
              <option value="final">Track 1–66 (Final)</option>
            </select>
            <ChevronUpDownIcon className="top-1/2 right-2 absolute size-5 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex-col gap-2 w-full">
          <button
            type="button"
            className="bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 mt-2 py-3 rounded-lg w-full font-medium transition-colors cursor-pointer"
            onClick={navigateToPlay}
          >
            Listen in order
          </button>
          <button
            type="submit"
            className="bg-amber-700 hover:bg-amber-800 active:bg-amber-900 dark:bg-amber-900 dark:hover:bg-amber-800 dark:active:bg-amber-700 mt-2 py-3 rounded-lg w-full font-medium text-amber-50 transition-colors cursor-pointer"
          >
            Start quiz
          </button>
        </div>
      </form>
    </main>
  );
}
