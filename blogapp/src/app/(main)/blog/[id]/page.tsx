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
      user
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
  const data: any = await gqlClient.request(GET_BLOG, {
    blogId: id,
  });
  const blog = data.blog;
  console.log(data);

  return (
    <div>
      <BlogDetail blog={blog} />
    </div>
  );
}
