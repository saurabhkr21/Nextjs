import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import { gql, GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient("http://localhost:3000/api/graphql");
const GET_BLOGS = gql`
  query Blog {
    blogs {
      content
      createdAt
      id
      image_url
      title
    }
  }
`;

export default async function Home() {
  //@ts-ignore
  const data: { blogs: Blog[] } = await gqlClient.request(GET_BLOGS);
  const blogs = data.blogs;
  console.log(data);
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
        {blogs.map((blog: any) => (
          <div key={blog.id}>
            <BlogCard item={blog} />
          </div>
        ))}
      </main>
    </div>
  );
}
