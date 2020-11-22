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
    file: Upload
  }
  type Art {
    id: ID!
    title: String!
    details: String
    category: String
    tags: [String],
    createdAt: String
    publishedAt: String
    img: File,
    userId: ID!
    comments: [Comment]
    likes: [Like]
  }
  type Comment {
    id: ID!
    text: String!
    createdAt: String
    userId: ID!
  }
  type Like {
      id: ID!
      createdAt: String
      userId: ID!
  }
  input CreateArtInput {
    title: String!,
    details: String,
    category: String,
    tags: [String]
    file: Upload!
    albumName: String
    toPublish: Boolean
  }
  type Query {
    hello: String
    files: [File!]
    getArts: [Art]
    getPublishedArtsByCategory(category: String!): [Art]
  }
  type Mutation {
    uploadFile(file: Upload!): File
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createAlbum(name: String!): Album
    deleteAlbum(albumId: ID!): String
    createArt(createArtInput: CreateArtInput): Art
    publishArt(artId: ID!): Art
    unpublishArt(artId: ID!): Art
    addArtToAlbum(artId: ID!, albumId: ID!): Album
    deleteArtFromAlbum(artId: ID!, albumId: ID!): Album
  }
`;