//@ts-ignore
import React, { FunctionComponent, useEffect, useRef } from 'react';
import '../video.scss';

export interface VideoProps {
  source: {
    type: string;
    src: string;
  };
  options: {
    controls?: boolean;
    muted?: boolean;
    autoplay?: boolean;
    poster?: string;
    playsinline?: boolean;
    loop?: boolean;
  };
  className: string;
  style: React.CSSProperties;
  play: (e: HTMLVideoElement) => void;
  pause: (e: HTMLVideoElement) => void;
  playEnd: (e: HTMLVideoElement) => void;
  onPlayFuc: (e: HTMLVideoElement) => void;
  onPauseFuc: (e: HTMLVideoElement) => void;
  onPlayend: (e: HTMLVideoElement) => void;
}
const defaultProps = {
  source: {
    type: {},
    src: '',
  },
  options: {
    controls: true,
    muted: false,
    autoplay: false,
    poster: '',
    playsinline: false,
    loop: false,
  },
} as VideoProps;
export const Video: FunctionComponent<
  Partial<VideoProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    children,
    source,
    options,
    className,
    play,
    pause,
    playEnd,
    onPlayFuc,
    onPauseFuc,
    onPlayend,
    ...restProps
  } = { ...defaultProps, ...props };
  const rootRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    if (rootRef.current) {
      const videoRef = rootRef.current;
      if (options.autoplay) {
        setTimeout(() => {
          videoRef.play();
        }, 200);
      }
      if (options.playsinline) {
        videoRef.setAttribute('playsinline', String());
        videoRef.setAttribute(
          'webkit-playsinline',
          String(options.playsinline)
        );
        videoRef.setAttribute('x5-video-player-type', 'h5-page');
        videoRef.setAttribute('x5-video-player-fullscreen', 'false');
      }
      videoRef.addEventListener('play', () => {
        onPlayFuc && onPlayFuc(videoRef);
        play && play(videoRef);
      });
      videoRef.addEventListener('pause', () => {
        onPauseFuc && onPauseFuc(videoRef);
        pause && pause(videoRef);
      });
      videoRef.addEventListener('ended', () => {
        videoRef.currentTime = 0;
        onPlayend && onPlayend(videoRef);
        playEnd && playEnd(videoRef);
      });
    }
  };
  return (
    <div className="chihuoui-video">
      <video
        className="chihuoui-video-player"
        muted={options.muted}
        autoPlay={options.autoplay}
        loop={options.loop}
        poster={options.poster}
        controls={options.controls}
        ref={rootRef}
        src={source.src}
      >
        <source
          src={source.src}
          type={source.type}
        />
        <track kind="captions" />
      </video>
    </div>
  );
};

Video.defaultProps = defaultProps;
Video.displayName = 'ChihuouiVideo';
