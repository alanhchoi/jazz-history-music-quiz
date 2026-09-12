import { useRef, useState } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface PlayerProps {
  tune: {
    title: string;
    credits: string;
    youtubeId: string;
  };
  randomStartTime: boolean;
}

function getRandomIntExclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function Player({ tune, randomStartTime }: PlayerProps) {
  const youtubePlayerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const { title, credits, youtubeId } = tune;

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    const player = event.target;
    youtubePlayerRef.current = event.target;

    if (randomStartTime) {
      const duration = player.getDuration();
      const startTime = getRandomIntExclusive(0, duration - 60);
      setStartTime(startTime);
      player.seekTo(startTime);
    }
  };

  const opts: YouTubeProps["opts"] = {
    width: 320,
    height: 240,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      playsinline: 1,
    },
  };

  return (
    <div className="flex flex-row flex-wrap items-start gap-4 px-4 min-w-0">
      <YouTube
        videoId={youtubeId}
        style={{ display: showAnswer ? "block" : "none" }}
        onReady={onPlayerReady}
        onPlay={() => {
          setIsPlaying(true);
          setHasPlayed(true);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onEnd={() => {
          setIsPlaying(false);
        }}
        opts={opts}
      />
      <div>
        {showAnswer ? (
          <div className="max-w-96 text-pretty">
            <b>{title}</b>
            <p>{credits}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  youtubePlayerRef.current?.seekTo(startTime);
                  youtubePlayerRef.current?.playVideo();
                }}
                className="flex flex-col justify-center items-center gap-0.5 enabled:hover:bg-black disabled:opacity-25 border rounded-full w-24 aspect-square font-medium enabled:hover:text-white text-xs uppercase enabled:cursor-pointer"
                disabled={!hasPlayed}
              >
                <ArrowPathIcon className="size-8" />
                Replay
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isPlaying) {
                    youtubePlayerRef.current?.pauseVideo();
                  } else {
                    youtubePlayerRef.current?.playVideo();
                  }
                }}
                className={clsx(
                  "flex flex-col justify-center items-center gap-0.5 hover:bg-black border rounded-full w-24 aspect-square font-medium hover:text-white text-xs uppercase cursor-pointer",
                  {
                    "bg-black text-white": isPlaying,
                  },
                )}
              >
                {isPlaying ? (
                  <>
                    <PauseIcon className="size-8" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayIcon className="size-8" />
                    Play
                  </>
                )}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowAnswer(true)}
              disabled={!hasPlayed}
              className={clsx(
                "py-6 rounded-full w-full font-medium uppercase transition-opacity cursor-pointer",
                { "opacity-0": !hasPlayed },
              )}
            >
              Show Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
