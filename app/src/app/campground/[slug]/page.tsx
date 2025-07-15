import Chip from "@/app/components/Chip";
import { urlFor } from "@/app/utils";
import { client } from "@/sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText, type SanityDocument } from "next-sanity";
import Link from "next/link";

const CAMPGROUND_QUERY = `*[_type == "campground" && slug.current == $slug][0]{_id, name, slug, image, features[]->, visited, teaser, description, price, distance->}`;

const options = { next: { revalidate: 30 } };

export default async function CampgroundPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const campground = await client.fetch<SanityDocument>(
    CAMPGROUND_QUERY,
    await params,
    options
  );
  const campgroundImageUrl = campground.image
    ? urlFor(campground.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-5xl p-4 lg:p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        __Back to campgrounds
      </Link>
      <div className="rounded-xl bg-green-90">
        {campgroundImageUrl && (
          <img
            src={campgroundImageUrl}
            alt={campground.name}
            className="aspect-video rounded-t-xl w-full h-75 object-cover"
          />
        )}

        <div className="rounded-lg bg-green-60 m-5 lg:m-12 p-5 lg:p-8 flex flex-col gap-4">
          <h1 className="text-4xl font-bold font-[--font-merriweather]">
            {campground.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            {campground.visited ? (
              <Chip>
                <span className="font-normal">Visited:</span>{" "}
                {campground.visited}
              </Chip>
            ) : (
              <Chip>Unexplored!</Chip>
            )}
            <Chip>
              <span className="font-normal">Price:</span> $
              {campground.price ? `${campground.price.perNight} p/n` : "Free!"}
            </Chip>
            {campground.distance && (
              <Chip>{campground.distance.name} Drive</Chip>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {campground.features.map((feature: { title: string }) => (
              <Chip color="gold" key={feature.title}>
                {feature.title}
              </Chip>
            ))}
          </div>
          <div className="prose">
            {Array.isArray(campground.description) && (
              <PortableText
                value={campground.description}
                components={components}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const components = {
  types: {
    image: (props: { value: { asset: SanityImageSource } }) => {
      const imageUrl = props.value.asset
        ? urlFor(props.value.asset)?.width(550).height(310).url()
        : null;
      return (
        <img
          src={imageUrl ?? ""}
          className="aspect-video rounded-xl w-full object-cover"
        />
      );
    },
  },
};
