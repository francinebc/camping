import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";

const CAMPGROUND_QUERY = `*[_type == "campground" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

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
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to campgrounds
      </Link>
      {campgroundImageUrl && (
        <img
          src={campgroundImageUrl}
          alt={campground.name}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{campground.name}</h1>
      <div className="prose">
        {Array.isArray(campground.description) && <PortableText value={campground.description} />}
      </div>
    </main>
  );
}
