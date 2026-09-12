import type { Route } from "./+types/home";
import type { SubmitEventHandler } from "react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jazz History Listening List Music Quiz" },
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
    <main className="flex flex-col px-8 pt-8 pb-4">
      <header className="mb-8">
        <h1 className="font-bold text-5xl text-pretty">
          Jazz History Listening List Music Quiz
        </h1>
      </header>
      <form
        className="flex flex-col flex-1 items-start gap-4 max-w-96"
        onSubmit={startQuiz}
      >
        <fieldset className="items-stretch w-full">
          <legend className="mb-1 font-semibold text-sm uppercase tracking-wider">
            Scope
          </legend>
          <div className="flex flex-col border border-neutral-300 dark:border-neutral-400 rounded-sm">
            <div className="flex items-center gap-3 dark:has-checked:bg-transparent has-checked:bg-neutral-100 light:has-checked:bg-neutral-100 py-2 ps-4 border-neutral-300 dark:border-neutral-400 border-b dark:has-checked:text-white dark:text-neutral-400">
              <input
                type="radio"
                name="scope"
                id="exam1"
                value="exam1"
                defaultChecked
              />
              <label className="flex-1" htmlFor="exam1">
                Track 1–22 (Exam 1)
              </label>
            </div>
            <div className="flex items-center gap-3 light:has-checked:bg-neutral-100 py-2 ps-4 border-neutral-300 dark:border-neutral-400 border-b dark:has-checked:text-white dark:text-neutral-400">
              <input type="radio" name="scope" id="exam2" value="exam2" />
              <label className="flex-1" htmlFor="exam2">
                Track 23–44 (Exam 2)
              </label>
            </div>
            <div className="flex items-center gap-3 light:has-checked:bg-neutral-100 py-2 ps-4 border-neutral-300 dark:border-neutral-400 border-b dark:has-checked:text-white dark:text-neutral-400">
              <input type="radio" name="scope" id="exam3" value="exam3" />
              <label className="flex-1" htmlFor="exam3">
                Track 23–44 (Exam 3)
              </label>
            </div>
            <div className="flex items-center gap-3 light:has-checked:bg-neutral-100 py-2 ps-4 dark:has-checked:text-white dark:text-neutral-400">
              <input type="radio" name="scope" id="final" value="final" />
              <label className="flex-1" htmlFor="final">
                Track 1–66 (Final)
              </label>
            </div>
          </div>
        </fieldset>

        <div className="flex items-center gap-3 light:has-checked:bg-neutral-100 py-2 ps-4 border border-neutral-300 dark:border-neutral-400 rounded-sm w-full dark:has-checked:text-white dark:text-neutral-400">
          <input id="randomStartTime" name="randomStartTime" type="checkbox" />
          <label className="flex-1" htmlFor="randomStartTime">
            Randomize start time
          </label>
        </div>

        <button
          type="submit"
          className="light:hover:bg-neutral-800 mt-2 py-3 border border-neutral-800 dark:border-neutral-400 rounded-full w-full hover:text-white cursor-pointer"
        >
          Start
        </button>
      </form>
    </main>
  );
}
