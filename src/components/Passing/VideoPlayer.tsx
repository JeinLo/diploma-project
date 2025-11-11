interface VideoPlayerProps {
  videoUrl: string | null;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  if (!videoUrl) {
    return (
      <div className="video-wrapper">
        <div className="video-placeholder">Видео недоступно</div>
      </div>
    );
  }

  return (
    <div className="video-wrapper">
      <iframe
        className="youtube-player"
        src={`https://www.youtube.com/embed/gJPs7b8SpVw`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}