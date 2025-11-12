// src/components/Passing/VideoPlayer.tsx
interface VideoPlayerProps {
  videoUrl: string | null;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const finalUrl = videoUrl || 'https://www.youtube.com/embed/gJPs7b8SpVw';

  return (
    <div className="video-wrapper">
      <iframe
        className="youtube-player"
        src={finalUrl}
        title="Тренировка"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}