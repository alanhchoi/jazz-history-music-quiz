import { useRef, useState } from "react";
import YouTube, { type YouTubeProps } from "react-youtube";

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
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      playsinline: 1,
    },
  };

  return (
    <div>
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
          <div>
            <b>{title}</b>
            <p>{credits}</p>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                youtubePlayerRef.current?.seekTo(startTime);
                youtubePlayerRef.current?.playVideo();
              }}
            >
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
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            {hasPlayed && (
              <button type="button" onClick={() => setShowAnswer(true)}>
                Show Answer
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
