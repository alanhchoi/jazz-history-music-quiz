import { Link, useSearchParams } from "react-router";
import data from "../data.json";
import { useMemo, useState } from "react";
import { shuffle } from "fast-shuffle";
import Player from "../Player";

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

  const scope = getScope(scopeParam);
  const listLength = scope[1] - scope[0] + 1;
  const filteredList = listeningList.slice(scope[0] - 1, scope[1]);
  const shuffledFilteredList = useMemo(
    () => shuffle(filteredList),
    [filteredList],
  );

  const currentItem = shuffledFilteredList[current];

  return (
    <div>
      <header>
        <Link to="/">Home</Link>
        <div>
          Scope: tracks {scope[0]}–{scope[1]}
        </div>
        <div>
          <input
            id="randomStartTime"
            name="randomStartTime"
            type="checkbox"
            checked={randomStartTime}
            onChange={(event) => {
              setRandomStartTime(event.target.checked);
            }}
          />
          <label htmlFor="randomStartTime">Randomize start time</label>
        </div>
        <div>
          {current + 1} / {listLength}
        </div>
      </header>
      <div>
        <Player
          key={currentItem.youtubeId}
          tune={currentItem}
          randomStartTime={randomStartTime}
        />
        <button
          type="button"
          onClick={() => setCurrent(current - 1)}
          disabled={current === 0}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrent(current + 1)}
          disabled={current === listLength - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
