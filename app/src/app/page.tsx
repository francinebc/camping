import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "campground"
  && defined(slug.current)
]|order(name desc)[0...12]{_id, name, slug}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Campgrounds</h1>
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
