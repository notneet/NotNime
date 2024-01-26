import { Button } from "@nextui-org/button";
import { Slider } from "@nextui-org/slider";
import clsx from "clsx";
import { Duration } from "luxon";
import { FC, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

export interface VideoControlProps {
  streamUrl: string;
  className?: string;
}

export const VideoControl: FC<VideoControlProps> = ({
  streamUrl,
  className,
}: VideoControlProps) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [sliderMaxValue, setSliderMaxVal] = useState(1);
  const [loadedTime, setLoadedTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [playedTimeText, setPlayedTimeText] = useState("00:00");
  const [totalTimeText, setTotalTimeText] = useState("00:00");

  /**
   * React Player
   */
  const handleOnProgress = (state: OnProgressProps) => {
    console.log("onProgress", state);
    setLoadedTime(state.loadedSeconds);
    setSeekTime(state.playedSeconds);
    setPlayedTimeText(
      Duration.fromObject({ seconds: state.playedSeconds }).toFormat("mm:ss")
    );
  };

  const handleOnReady = (player: ReactPlayer) => {
    console.log("onReady", player);
  };

  const handleOnDuration = (duration: number) => {
    console.log(
      "onDuration",
      duration,
      Duration.fromObject({ seconds: duration }).toFormat("mm:ss")
    );
    setSliderMaxVal(duration);
    setTotalTimeText(
      Duration.fromObject({ seconds: duration }).toFormat("mm:ss")
    );
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  /**
   * Video Controller
   * */
  const sliderOnChange = (value: number | number[]) => {
    console.log("Seek to:", value);
    if (playerRef.current) {
      playerRef.current.seekTo(+value, "seconds");
      setSeekTime(+value);
    }
  };

  const handleSeekInc = () => {
    if (playerRef.current) {
      const currentTimeSecond = playerRef.current.getCurrentTime();
      setSeekTime(currentTimeSecond + 5);
      playerRef.current.seekTo(currentTimeSecond + 5, "seconds");
    }
  };

  const handleSeekDec = () => {
    if (playerRef.current) {
      const currentTimeSecond = playerRef.current.getCurrentTime();
      setSeekTime(currentTimeSecond - 5);
      playerRef.current.seekTo(currentTimeSecond - 5, "seconds");
    }
  };

  return (
    <div className={clsx(className)}>
      {" "}
      <ReactPlayer
        ref={playerRef}
        width="640"
        height="360"
        url={streamUrl}
        controls={false}
        playing={playing}
        onProgress={handleOnProgress}
        onReady={handleOnReady}
        onDuration={handleOnDuration}
      />
      {sliderMaxValue && (
        <div className="flex max-w-full gap-2 pt-2">
          <Button onClick={handlePlayPause} isDisabled={sliderMaxValue < 1}>
            {playing ? "Pause" : "Play"}
          </Button>
          <div className="flex flex-col gap-1 w-full">
            <div className="relative max-w-full ">
              <Slider
                aria-label="Player progress"
                color="foreground"
                hideThumb={true}
                onChange={sliderOnChange}
                size="md"
                step={1}
                value={loadedTime}
                maxValue={sliderMaxValue}
                minValue={0}
                showOutline={false}
                defaultValue={1}
                isDisabled={true}
                className="max-w-full absolute opacity-50 z-0"
              />
              <Slider
                aria-label="Player progress"
                color="foreground"
                hideThumb={true}
                onChange={sliderOnChange}
                size="md"
                value={seekTime}
                step={1}
                maxValue={sliderMaxValue}
                minValue={0}
                showOutline={false}
                isDisabled={sliderMaxValue < 1}
                className="max-w-full absolute z-10"
              />
            </div>

            <div className="flex justify-between pt-4">
              <p className="text-small">{playedTimeText}</p>
              <p className="text-small text-foreground/50">{totalTimeText}</p>
            </div>
          </div>
          <Button onClick={handleSeekDec} isDisabled={sliderMaxValue < 1}>
            Dec 5
          </Button>
          <Button onClick={handleSeekInc} isDisabled={sliderMaxValue < 1}>
            Inc 5
          </Button>
        </div>
      )}
    </div>
  );
};
