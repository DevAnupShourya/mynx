import { useState } from "react";
import { Button } from "@nextui-org/react";

import ImageCollageGrid from "~/components/image_views/ImageCollageGrid";
import VideoCollageGrid from "~/components/video_views/VideoCollageGrid";

// * Title & Images[] || Videos[]
function VixetPostDisplay({
  title,
  images,
  author,
  videos,
}: {
  title: string;
  author: string;
  images?: string[];
  videos?: string[];
}) {
  // ? For Toggling between full and short 
  const [showFullTitle, setShowFullTitle] = useState(false);

  const truncatedTitle = showFullTitle ? title : `${title.slice(0, 255)}`;

  return (
    <div>
      <h1 className="text-lg font-bold">
        {truncatedTitle}
        {title.length > 255 && (
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
      {images && images?.length > 0 && (
        <ImageCollageGrid images={images} />
      )}
      {videos && videos?.length > 0 && (
        <VideoCollageGrid videos={videos} key={`Images of ${author}`} />
      )}
    </div>
  );
}

export default VixetPostDisplay;
