import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { urlFor } from "./utils";
import CampgroundCard from "./components/CampgroundCard";

const CAMPGROUNDS_QUERY = `*[
  _type == "campground"
  && defined(slug.current)
]|order(name desc)[0...12]{_id, name, slug, image, features[]->, visited, teaser}`;

const HOME_QUERY = `*[
  _type == "homePage"
]`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const campgrounds = await client.fetch<SanityDocument[]>(CAMPGROUNDS_QUERY, {}, options);
  const [home] = await client.fetch<SanityDocument[]>(HOME_QUERY, {}, options);

  const homeImageUrl = home.image
    ? urlFor(home.image)?.width(2000).url()
    : null;

  return (
    <main>
      {homeImageUrl && (
        <div className="w-full">
          <img
            src={homeImageUrl}
            alt={home.title}
            className="h-100 w-full object-cover"
          />
        </div>
      )}
      <div className="container mx-auto min-h-screen max-w-5xl p-5 lg:p-8 my-16 lg:my-28">
        <div className="rounded-xl bg-green-90 p-6 lg:p-12">
          <h1 className="text-4xl font-bold mb-2 font-[--font-merriweather]">
            {home.title}
          </h1>
          <p className="text-gold-50">{home.description}</p>
          <div className="mt-16 lg:mt-28">
            <h2 className="text-3xl font-semibold mb-8 font-[--font-merriweather]">
              Campgrounds
            </h2>
            <ul className="flex flex-col gap-y-4">
              {campgrounds.map((campground) => (
                <li
                  className="rounded-lg bg-green-60 p-5 lg:p-8"
                  key={campground._id}
                >
                  <Link href={`/campground/${campground.slug.current}`}>
                    <CampgroundCard campground={campground} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
