import { gql } from "graphql-request";

export const CREATE_USER = gql`
  mutation Mutation(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
    $role: String!
  ) {
    createUser(
      name: $name
      email: $email
      username: $username
      password: $password
      role: $role
    ) {
      username
      name
      role
      email
      avatar
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProducts(
    $title: String!
    $description: String!
    $category: String!
    $price: Float!
    $stock: Int!
    $imageUrl: String!
  ) {
    addProducts(
      title: $title
      description: $description
      category: $category
      price: $price
      stock: $stock
      imageUrl: $imageUrl
    ) {
      id
      title
      description
      category
      price
      stock
      imageUrl
    }
  }
`;

export const EDIT_USER = gql`
  mutation UpdateUserProfile(
    $userId: String!
    $name: String
    $email: String
    $username: String
    $avatar: String
  ) {
    updateUserProfile(
      userId: $userId
      name: $name
      email: $email
      username: $username
      avatar: $avatar
    )
  }
`;

export const PRODUCT_UPDATE = gql`
  mutation UpdateProduct(
    $updateProductId: String!
    $title: String
    $description: String
    $category: String
    $price: Float
    $stock: Int
    $imageUrl: String
  ) {
    updateProduct(
      id: $updateProductId
      title: $title
      description: $description
      category: $category
      price: $price
      stock: $stock
      imageUrl: $imageUrl
    ) {
      id
      title
      description
      category
      price
      stock
      imageUrl
    }
  }
`;
