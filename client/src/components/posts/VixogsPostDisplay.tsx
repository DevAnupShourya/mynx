import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@nextui-org/react";

import ImageCollageGrid from "~/components/image_views/ImageCollageGrid";

// * Title & Description & ImageUrl
function VixogsPostDisplay({
  title,
  description,
  author,
  images,
}: {
  title: string;
  description: string;
  author: string;
  images?: string[];
}) {
  // ? For Toggling between full and short
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const truncatedTitle = showFullTitle ? title : `${title.slice(0, 50)}`;
  const truncatedDesc = showFullDesc
    ? description
    : `${description.slice(0, 150)}`;

  return (
    <div>
      {images && images?.length > 0 && (
        <ImageCollageGrid images={images} key={`Images of ${author}`} />
      )}
      <h1 className="text-lg font-bold my-2">
        {truncatedTitle}
        {title.length > 50 && (
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
      <ReactMarkdown className={"text-sm my-1"}>{truncatedDesc}</ReactMarkdown>
      {description.length > 150 && (
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
    </div>
  );
}

export default VixogsPostDisplay;
