import BlogDetail from "@/components/BlogDetail";
import gqlClient from "@/services/gql";
import { gql } from "graphql-request";

const GET_BLOG = gql`
  query Blog($blogId: String) {
    blog(id: $blogId) {
      id
      title
      content
      image_url
      createdAt
      User {
        id
        name
        email
      }
    }
  }
`;

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data: any = await gqlClient.request(GET_BLOG, {
    blogId: id,
  });
  const blog = data.blog;
  console.log("data blog:", data);

  return (
    <div>
      <BlogDetail blog={blog} />
    </div>
  );
}
