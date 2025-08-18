import gqlClient from "@/services/gql";
import { gql, GraphQLClient } from "graphql-request";
import BlogCard from "@/components/BlogCard";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { blog } from "../../../../generated/prisma";

const SEARCH_QUERY = gql`
  query Blogs($q: String) {
    blogs(q: $q) {
      id
      title
      content
      image_url
      createdAt
    }
  }
`;

export default async function page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = await searchParams;
  const q = query.q;
  const data: { blogs: blog[] } = await gqlClient.request(SEARCH_QUERY, { q });
  const blogs = data.blogs;
  return (
    <div className="flex flex-col px-3 py-5 max-w-6xl mx-auto">
      <div className="flex  items-center justify-between text-gray-500">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        <Link href="/" className="flex items-center gap-1">
          <ArrowBigLeft className="h-6 w-6" />
          <span>Back to Home</span>
        </Link>
      </div>
      <p className="text-gray-600">Found {blogs.length} results for "{q}"</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-7xl px-4 py-5">
        {blogs.map((item: blog) => (
          <div key={item.id}>
            <BlogCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
