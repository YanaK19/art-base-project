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
    id: ID!
    name: String!
    arts: [String]
  }
  input RegisterInput {
    email: String!
    password: String!
    username: String!
    about: String
    img: Upload
}
  type Query {
    hello: String
    files: [File!]
  }
  type Mutation {
    uploadFile(file: Upload!): File
    register(registerInput: RegisterInput): User!
  }
`;