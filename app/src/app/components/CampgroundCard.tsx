import { SanityDocument } from "next-sanity";
import { urlFor } from "../utils";

export default function CampgroundCard({ post }: { post: SanityDocument }) {
  const imageUrl = post.image ? urlFor(post.image)?.width(800).url() : null;
  console.log(post.visited);

  return (
    <div className="group rounded-lg bg-zinc-700 flex flex-col lg:flex-row gap-8">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.name}
          className="object-cover w-full max-lg:h-50 lg:w-50 lg:aspect-[5/4] rounded-lg"
        />
      )}
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="group-hover:underline text-xl font-semibold">
            {post.name}
          </h2>
          {post.visited && (
            <div className="rounded-full px-4 py-1 bg-lime-900 font-semibold text-sm w-fit">
              <span className="font-normal">Visited:</span> {post.visited}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {post.features.map((feature: { title: string }) => (
              <div
                className="rounded-full px-4 py-1 bg-amber-900 font-semibold text-sm"
                key={feature.title}
              >
                {feature.title}
              </div>
            ))}
          </div>
        </div>
        <p>{post.teaser}</p>
      </div>
    </div>
  );
}
