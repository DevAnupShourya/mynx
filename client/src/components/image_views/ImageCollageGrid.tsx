import { Image } from "@nextui-org/react";

function ImageCollageGrid({ images }: { images: string[] }) {
  const length = images.length;
  return (
    <div
      className={`w-full gap-1`}
      style={
        length === 1
          ? {
              display: "flex",
              flexDirection: "row",
            }
          : {
              display: "grid",
              placeItems: "center",
              gridTemplateColumns: `repeat(2, 1fr)`,
              gridTemplateRows: `repeat(1, 1fr)`,
            }
      }
    >
      {images.map((image, index) => (
        <Image
          isZoomed
          key={`img-${index}`}
          src={image}
          alt={`${image}`}
          className={`${length === 1 ? "w-full h-auto" : ""}`}
          radius="sm"
        />
      ))}
    </div>
  );
}

export default ImageCollageGrid;
