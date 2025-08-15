import { gql } from "graphql-request";

export const LOGIN_USER = gql`
  query ExampleQuery($userCred: String!, $password: String!) {
    loginUser(userCred: $userCred, password: $password)
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
      username
      role
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
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

export const GET_PRODUCT = gql`
  query GetProduct($getProductId: String!) {
    getProduct(id: $getProductId) {
      id
      title
      description
      category
      price
      stock
      imageUrl
      sales {
        id
        productId
        quantity
        createdAt
      }
    }
  }
`;

export const CREATE_SALE = gql`
  mutation CreateSale($id: String!, $quantity: Int!) {
    createSale(id: $id, quantity: $quantity)
  }
`;
