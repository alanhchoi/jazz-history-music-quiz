import { useLayoutEffect, useRef, useState } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface PlayerProps {
  tune: {
    title: string;
    credits: string;
    youtubeId: string;
  };
  randomStartTime?: boolean;
}

function getRandomIntExclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function Player({ tune, randomStartTime = false }: PlayerProps) {
  const youtubePlayerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playerWidth, setPlayerWidth] = useState(0);
  const { title, credits, youtubeId } = tune;

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    const player = event.target;
    youtubePlayerRef.current = event.target;

    if (randomStartTime) {
      const duration = player.getDuration();
      const startTime = getRandomIntExclusive(0, duration - 60);
      setStartTime(startTime);
      player.seekTo(startTime);
      player.pauseVideo();
    }
  };

  useLayoutEffect(() => {
    setPlayerWidth(Math.min(320, window.innerWidth - 32));
  }, []);

  const opts: YouTubeProps["opts"] = {
    width: playerWidth,
    height: playerWidth * 0.75,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      playsinline: 1,
    },
  };

  return (
    <div className="flex flex-row flex-wrap items-start gap-4 px-4 min-w-0">
      {playerWidth > 0 && (
        <YouTube
          videoId={youtubeId}
          style={
            showAnswer
              ? {}
              : {
                  opacity: 0,
                  pointerEvents: "none",
                  position: "fixed",
                  zIndex: -1,
                }
          }
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
          onStateChange={(event) => {
            console.log(event.data);
            const newIsBuffering = event.data === 3;
            setIsBuffering(newIsBuffering);
          }}
          opts={opts}
        />
      )}
      <div>
        {showAnswer ? (
          <div className="max-w-72 md:max-w-96 text-pretty">
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
                className="flex flex-col justify-center items-center gap-0.5 enabled:hover:bg-black disabled:opacity-25 border dark:enabled:hover:border-white enabled:hover:border-black rounded-full w-24 aspect-square font-medium enabled:hover:text-white text-xs uppercase enabled:cursor-pointer"
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
                disabled={isBuffering}
                className={clsx(
                  "relative flex flex-col justify-center items-center gap-0.5 enabled:hover:bg-black border dark:border-white dark:enabled:hover:border-white enabled:hover:border-black rounded-full w-24 aspect-square font-medium enabled:hover:text-white text-xs uppercase cursor-pointer",
                  {
                    "bg-black border-black dark:border-white text-white":
                      isPlaying,
                    "animate-pulse border-none": isBuffering,
                  },
                )}
              >
                <div
                  className={clsx(
                    "top-0 right-0 bottom-0 left-0 absolute opacity-0 border border-black dark:border-white border-dashed rounded-full animate-spin pointer-events-none dash- [animation-duration:5s]",
                    {
                      "opacity-100": isBuffering,
                    },
                  )}
                />
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
                { "opacity-0 disabled pointer-events-none": !hasPlayed },
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
