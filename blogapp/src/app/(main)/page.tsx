import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import { gql, GraphQLClient } from "graphql-request";
import { blog } from "../../../generated/prisma";

export const dynamic = "force-dynamic";

const gqlClient = new GraphQLClient("http://localhost:3000/api/graphql");
const GET_BLOGS = gql`
  query Query {
    blogs {
      id
      title
      content
      image_url
      createdAt
      userId
      User {
        name
        email
        id
      }
    }
  }
`;

export default async function Home() {
  const data: { blogs: blog[] } = await gqlClient.request(GET_BLOGS);
  const blogs = data.blogs;
  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500">
        <span className="text-lg font-semibold">No blogs found</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col px-3 py-5 max-w-6xl mx-auto">
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id}>
            <BlogCard item={blog} />
          </div>
        ))}
      </main>
    </div>
  );
}
