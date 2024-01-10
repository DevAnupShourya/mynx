import ReactPlayer from "react-player/lazy";

function VideoCollageGrid({ videos }: { videos: string[] }) {
  const length = videos.length;

  return (
    <div
      className={`w-full gap-1`}
      style={
        length === 1
          ? {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }
          : {
              display: "grid",
              placeItems: "center",
              alignItems: "center",
              gridTemplateColumns: `repeat(2, 1fr)`,
              gridTemplateRows: `repeat(1, 1fr)`,
            }
      }
    >
      {videos.map((videoSrc, index) => (
        <ReactPlayer
          key={`video-${index}`}
          url={videoSrc}
          className={`${length === 1 ? "w-full h-auto" : ""}`}
          playing={false}
          controls={true}
          light={true}
        />
      ))}
    </div>
  );
}

export default VideoCollageGrid;
