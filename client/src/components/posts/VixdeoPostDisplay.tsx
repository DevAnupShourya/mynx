import { useState } from "react";
import { Button } from "@nextui-org/react";

import VideoCollageGrid from "~/components/video_views/VideoCollageGrid";

// * Title & Description & VideoUrl
function VixdeoPostDisplay({
  title,
  description,
  author,
  videos,
}: {
  title: string;
  description: string;
  author: string;
  videos?: string[];
}) {
  // ? For Toggling between full and short 
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const truncatedTitle = showFullTitle ? title : `${title.slice(0, 55)}`;
  const truncatedDesc = showFullDesc
    ? description
    : `${description.slice(0, 200)}`;

  return (
    <div>
      {videos && videos?.length > 0 && (
        <VideoCollageGrid videos={videos} key={`Videos of ${author}`} />
      )}
      <h1 className="text-lg font-bold my-2 w-11/12 mx-auto">
        {truncatedTitle}
        {title.length > 55 && (
          <Button
            size="sm"
            variant="faded"
            onClick={() => {
              setShowFullTitle(!showFullTitle);
            }}
          >
            {showFullTitle ? "Show Less" : "View More"}
          </Button>
        )}
      </h1>

      <p className="text-lg my-1 w-11/12 mx-auto">
        {truncatedDesc}
        {description.length > 200 && (
          <Button
            size="sm"
            variant="faded"
            onClick={() => {
              setShowFullDesc(!showFullDesc);
            }}
          >
            {showFullDesc ? "Show Less" : "View More"}
          </Button>
        )}
      </p>
    </div>
  );
}

export default VixdeoPostDisplay;
