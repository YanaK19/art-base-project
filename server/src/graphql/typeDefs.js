import { gql } from "apollo-server";

export default gql`
  type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    about: String
    img: File
    albums: [Album]
    createdAt: String!
  }
  type Album {
    name: String!
    arts: ID!
  }
  type Query {
    hello: String
    files: [File!]
  }
  type Mutation {
    uploadFile(file: Upload!): File
  }
`;