// src/components/Passing/VideoPlayer.tsx
interface VideoPlayerProps {
  videoUrl: string;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <div className="video-wrapper">
      <iframe
        className="youtube-player"
        src={videoUrl}
        title="Тренировка"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}