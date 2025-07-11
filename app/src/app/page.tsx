import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POSTS_QUERY = `*[
  _type == "campground"
  && defined(slug.current)
]|order(name desc)[0...12]{_id, name, slug}`;

const HOME_QUERY = `*[
  _type == "homePage"
]`;

const options = { next: { revalidate: 30 } };
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const [home] = await client.fetch<SanityDocument[]>(HOME_QUERY, {}, options);

  const homeImageUrl = home.image
    ? urlFor(home.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">{home.title}</h1>
      {homeImageUrl && (
        <img
          src={homeImageUrl}
          alt={home.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <p>{home.description}</p>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/campground/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
