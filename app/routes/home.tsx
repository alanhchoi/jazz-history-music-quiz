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
    <main className="flex flex-col px-4 pt-16 pb-4">
      <header>
        <h1>Jazz History Listening List Music Quiz</h1>
      </header>
      <form className="flex flex-col items-start" onSubmit={startQuiz}>
        <fieldset>
          <legend>Scope</legend>
          <div>
            <input
              type="radio"
              name="scope"
              id="exam1"
              value="exam1"
              defaultChecked
            />
            <label htmlFor="exam1">Track 1–22 (Exam 1)</label>
          </div>
          <div>
            <input type="radio" name="scope" id="exam2" value="exam2" />
            <label htmlFor="exam2">Track 23–44 (Exam 2)</label>
          </div>
          <div>
            <input type="radio" name="scope" id="exam3" value="exam3" />
            <label htmlFor="exam3">Track 23–44 (Exam 3)</label>
          </div>
          <div>
            <input type="radio" name="scope" id="final" value="final" />
            <label htmlFor="final">Track 1–66 (Final)</label>
          </div>
        </fieldset>
        <div>
          <input id="randomStartTime" name="randomStartTime" type="checkbox" />
          <label htmlFor="randomStartTime">Randomize start time</label>
        </div>

        <button type="submit">Start</button>
      </form>
    </main>
  );
}
