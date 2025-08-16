import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean
    currentUser: User
    getAllUsers: [User]
    getUser(id: String!): User
    getAllProducts: [Product]
    getProduct(id: String!): Product

    # getProductSales(id: String!): [Sales]
  }
  type Sale {
    id: String
    productId: String
    quantity: Int
    createdAt: String
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      username: String!
      password: String!
      role: String!
    ): User

    updateUserRole(userId: String!, role: String!): Boolean

    updateUserProfile(
      userId: String!
      name: String
      email: String
      username: String
      avatar: String
    ): Boolean

    updateProduct(
      id: String!
      title: String
      description: String
      category: String
      price: Float
      stock: Int
      imageUrl: String
    ): Product

    addProducts(
      title: String!
      description: String!
      category: String!
      price: Float!
      stock: Int!
      imageUrl: String!
    ): Product

    deleteProduct(id: String!): Boolean
    
    createSale(id: String!, quantity: Int!): Boolean
  }

  type Product {
    id: String
    title: String
    description: String
    category: String
    price: Float
    stock: Int
    imageUrl: String
    sales: [Sale]
  }

  type User {
    id: String
    name: String
    email: String
    username: String
    password: String
    avatar: String
    role: String
  }
`;

export default typeDefs;
