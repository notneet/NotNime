import { Button } from "@nextui-org/button";
import { Code } from "@nextui-org/code";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Slider } from "@nextui-org/slider";
import clsx from "clsx";
import { Duration } from "luxon";
import { FC, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import screenfull from "screenfull";

export interface VideoControlProps {
  streamUrl: string;
  className?: string;
}

export const VideoControl: FC<VideoControlProps> = ({
  streamUrl,
  className,
}: VideoControlProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [sliderMaxValue, setSliderMaxVal] = useState(1);
  const [loadedTime, setLoadedTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [playedTimeText, setPlayedTimeText] = useState("00:00");
  const [totalTimeText, setTotalTimeText] = useState("00:00");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "h") {
        event.preventDefault();
        onOpen();
      }

      if (event.key === "f") {
        handleFullscreen();
      }

      if (event.key === "k") {
        handlePlayPause();
      }

      if (event.key === "j") {
        handleSeekDec();
      }

      if (event.key === "l") {
        handleSeekInc();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playing]);

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

  const handleFullscreen = () => {
    screenfull.request(document.querySelector(".react-player")!);
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
      <span className="block pb-2">
        &#128712; Media Control Shortcut <Code>Ctrl+H</Code>
      </span>
      <ReactPlayer
        className="react-player"
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
          <Button
            onClick={handlePlayPause}
            isDisabled={sliderMaxValue < 1}
            radius="full"
          >
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
          <Button
            onClick={handleSeekDec}
            isDisabled={sliderMaxValue < 1}
            radius="full"
          >
            Dec 5
          </Button>
          <Button
            onClick={handleSeekInc}
            isDisabled={sliderMaxValue < 1}
            radius="full"
          >
            Inc 5
          </Button>
        </div>
      )}

      {/* Modal KeyShortcut */}
      <Modal size="xs" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Media Player Shortcut
              </ModalHeader>
              <ModalBody>
                <ul>
                  <li>
                    <Code>f</Code>: Fullscreen
                  </li>
                  <li>
                    <Code>t</Code>: Cinema Display
                  </li>
                  <li>
                    <Code>k</Code>: Play/Pause
                  </li>
                  <li>
                    <Code>j</Code>: Seek to left
                  </li>
                  <li>
                    <Code>l</Code>: Seek to right
                  </li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  radius="full"
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
