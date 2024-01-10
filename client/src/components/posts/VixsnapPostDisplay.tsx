import ImageCollageGrid from "~/components/image_views/ImageCollageGrid";

// * Image[]
function VixsnapPostDisplay({
  images,
  author,
}: {
  images: string[];
  author: string;
}) {
  return (
    <div>
      {images && images?.length > 0 && (
        <ImageCollageGrid images={images} key={`Images of ${author}`} />
      )}
    </div>
  );
}

export default VixsnapPostDisplay;
