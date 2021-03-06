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
    arts: [ID]
  }
  type AlbumExt {
    id: ID!
    name: String!
    arts: [Art]
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
    tags: [String]
    createdAt: String
    publishedAt: String
    img: File
    user: UserLight
    comments: [Comment]
    likes: [Like]
  }
  type ArtExt {
    id: ID!
    title: String!
    details: String
    category: String
    tags: [String]
    createdAt: String
    publishedAt: String
    img: File
    user: UserExt
    comments: [Comment]
    likes: [Like]
  }
  type UserLight {
    id: ID!
    username: String!
    img: File
  }
  type UserExt {
    id: ID!
    username: String!
    img: File
    about: String!
    arts: [File]
  }
  type Comment {
    id: ID!
    text: String!
    createdAt: String
    user: UserLight
  }
  type Like {
      id: ID!
      userId: ID!
      createdAt: String   
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
  type Dictionary {
    id: ID!
    categories: [Category],
    tags: [String]
  }
  type Category {
    id: ID!
    name: String!
    details: String
    imgs: [File]  
}
  type Query {
    hello: String
    files: [File!]
    getArts: [Art]
    getPublishedArtsByCategory(category: String!): [Art]
    getPublishedArt(artId: ID!): ArtExt
    getAlbums: [Album]
    getAlbumsWithArts: [AlbumExt]
    getDictionary(dictionaryId: ID!): Dictionary
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
    likeArt(artId: ID!): ArtExt!
    createArtComment(artId: ID!, text: String!): ArtExt!
    deleteArtComment(artId: ID!, commentId: ID!): ArtExt!

    createDictionary(tags: [String]): Dictionary
    createCategory(dictionaryId: ID!, name: String!, details: String, files: [Upload]): Dictionary
  }
`;