import BlogDetail from "@/components/BlogDetail";
import gqlClient from "@/services/gql";
import { gql, GraphQLClient } from "graphql-request";

const GET_BLOG = gql`
  query Blog($blogId: String) {
    blog(id: $blogId) {
      id
      title
      content
      image_url
      createdAt
    }
  }
`;

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const id = p.id;
  //@ts-ignore
  const data: { blog: Blog } = await gqlClient.request(GET_BLOG, {
    blogId: id,
  });
  const blog = data.blog;
  console.log(data);

  return (
    <div>
      {/* <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <img src={blog.image_url} alt={blog.title} />
      <time>{new Date(blog.createdAt).toLocaleDateString()}</time> */}
      <BlogDetail blog={blog}  />
    </div>
  );
}
