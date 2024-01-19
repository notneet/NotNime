"use client";

import { title } from "@/components/primitives";
import { WatchService } from "@/services/watch";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

export default function EpisodeAnimePage({
  params,
}: {
  params: { anime: string };
}) {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);

  const {
    data: anime,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["detail-anime", params.anime],
    queryFn: WatchService.getOne,
    retry: 1,
    select: ({ data }) => data,
  });

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSeek = (seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds, "seconds");
    }
  };

  const handleOnProgress = (state: OnProgressProps) => {
    console.log("onProgress", state);
  };
  const handleOnReady = (player: ReactPlayer) => {
    console.log("onReady", player);
  };
  const handleOnDuration = (duration: number) => {
    console.log("onDuration", duration);
  };

  if (isPending) return <Spinner />;

  return (
    <div>
      <h1 className={clsx(title())}>{anime?.title_en}</h1>
      <div className="relative py-5">
        <ReactPlayer
          ref={playerRef}
          width="640"
          height="360"
          url={`https://is3.cloudhost.id/noneet-obs/anime/video/otakudesu/Kono_Subarashii_Sekai_ni_Bakuen_wo_1.mp4`}
          controls={false}
          playing={playing}
          onProgress={handleOnProgress}
          onReady={handleOnReady}
          onDuration={handleOnDuration}
        />
        <div className="absolute -bottom-5 left-0">
          <Button onClick={handlePlayPause}>
            {playing ? "Pause" : "Play"}
          </Button>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handlePlayPause}
          >
            {playing ? "Pause" : "Play"}
          </button> */}
          {/* <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={0} // You may want to bind this to current playtime
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            className="mt-2"
          /> */}
          {/* Add more custom controls as needed */}
        </div>
      </div>
    </div>
  );
}
