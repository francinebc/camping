import { SanityDocument } from "next-sanity";
import { urlFor } from "../utils";
import Chip from "./Chip";

export default function CampgroundCard({
  campground,
}: {
  campground: SanityDocument;
}) {
  const imageUrl = campground.image
    ? urlFor(campground.image)?.width(800).url()
    : null;

  return (
    <div className="group rounded-lg bg-green-60 flex flex-col lg:flex-row gap-8">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={campground.name}
          className="object-cover w-full max-lg:h-50 lg:w-50 lg:aspect-[5/4] rounded-lg"
        />
      )}
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="group-hover:underline text-xl font-semibold">
            {campground.name}
          </h2>
          {campground.visited ? (
            <Chip>
              <span className="font-normal">Visited:</span> {campground.visited}
            </Chip>
          ) : (
            <Chip>Unexplored!</Chip>
          )}
          <div className="flex flex-wrap gap-2">
            {campground.features.map((feature: { title: string }) => (
              <Chip color="gold" key={feature.title}>
                {feature.title}
              </Chip>
            ))}
          </div>
        </div>
        <p>{campground.teaser}</p>
      </div>
    </div>
  );
}
