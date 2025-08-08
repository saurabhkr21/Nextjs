import BlogCard from "@/components/BlogCard";
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
      <header className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-700 mb-2">
          Blog Explorer
        </h1>
        <p className="text-gray-500 text-base">
          Discover the latest posts and stories
        </p>
      </header>
      <form
        action={"/search"}
        className="mb-8 flex items-center gap-2 w-full max-w-lg mx-auto"
      >
        <input
          className="border border-gray-300 rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="search"
          placeholder="Search blogs..."
          name="q"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md font-semibold hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
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
