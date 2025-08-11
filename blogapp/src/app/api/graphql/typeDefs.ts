import { gql } from "graphql-request";

const typeDefs = gql`
  type Blog {
    id: String
    title: String
    content: String
    image_url: String
    createdAt: String
    userId: String
    User: User
  }
  type Mutation {
    createBlog(title: String!, content: String!, image_url: String): Blog
    deleteBlog(id: String!): Boolean!
    updateBlog(
      id: String!
      title: String
      content: String
      image_url: String
    ): Blog
    signUpUser(name: String!, email: String!, password: String!): Boolean!
    loginUser(email: String!, password: String!): Boolean!
  }
  type Query {
    blog(id: String): Blog
    blogs(q: String): [Blog]
    currentUser: User
    currentUserBlogs: [Blog]
  }
  type User {
    id: String
    name: String
    email: String
    createdAt: String
    blogs: [Blog]
  }
`;

export default typeDefs;
