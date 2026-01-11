import BlogDetail from "@/components/BlogDetail";
import gqlClient from "@/services/gql";
import { gql } from "graphql-request";
import { blog } from "../../../../../generated/prisma";

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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data: { blog: blog } = await gqlClient.request(GET_BLOG, {
    blogId: id,
  });
  const blog = data.blog;

  return (
    <div>
      <BlogDetail blog={blog} />
    </div>
  );
}
