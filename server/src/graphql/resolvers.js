import fileResolvers from './resolvers/file';
import userResolvers from './resolvers/user';
import artResolvers from './resolvers/art';
import dictionaryResolvers from './resolvers/dictionary';

export default {
  Query: {
    hello: () => "Hello world",
    ...fileResolvers.Query,
    ...userResolvers.Query,
    ...artResolvers.Query,
    ...dictionaryResolvers.Query
  },
  Mutation: {
    ...fileResolvers.Mutation,
    ...userResolvers.Mutation,
    ...artResolvers.Mutation,
    ...dictionaryResolvers.Mutation
  }
};

/* 
***********************************
token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmZhNGM4OWY1ZDVhMjhkNDliZWU4OSIsImVtYWlsIjoibGlzYUBtYWlsLnJ1IiwidXNlcm5hbWUiOiJMaXNhIiwiaWF0IjoxNjA2Mzk1MDgwfQ.LEkY_ap5WOO8at8gOvu9p15Lvyz5446Z_sQcch4mNGs
***********************************
mutation uploadFile($file: Upload!) {
  uploadFile(file: $file) {
    path
    id
    filename
    mimetype
  }
}
***********************************
mutation register($file: Upload!) {
  register(
    registerInput: {
      email: "em@mail.ru"
      password: "dfsf"
      username: "dfsd"
      about: "fdsfs"
      file: $file
    }
  ) {
    email
    username
    about
    token
    img {
      filename
      mimetype
    }
  }
}
***********************************
mutation {
  login(email: "cute@mail.ru", password: "cute") {
    username
    about
    img {
      id
      filename
    }
    albums {
      name
    }
    token
  }
}
***********************************
mutation {
  deleteAlbum(albumId: "5fba7df450dfe217643a3d14") 
}
***********************************
mutation createArt($file: Upload!) {
		createArt(createArtInput: {
      title: "School space"
      details: "Hi! See my cute artwork"
      category: "comics"
      toPublish: true
      file: $file
    }) {
    id
    title
    details
    category
    publishedAt
    img {
      filename
    }
    user {
      id
      username
      img {
        filename
      }
    }
  }
}
***********************************
mutation createArt($file: Upload!) {
		createArt(createArtInput: {
      title: "School"
      category: "comics"
      albumName: "Meow"
      toPublish: true
      file: $file
    }) {
    title
    img {
      filename
    }
  }
}
***********************************
mutation {
  unpublishArt(artId: "5fba92f459f34024f042984e") {
    title
    publishedAt
  }
}
***********************************
{
  getPublishedArtsByCategory(category: "comics") {
    id
    title
    category
    img {
      id
    }
  }
}
***********************************
mutation {
  deleteArtFromAlbum(albumId: "5fba7ca2e0491a1d8cce373b", artId: "5fba8e0ac11b470ff89364ca") {
    name
    arts
  }
}
***********************************
mutation {
  createDictionary(tags: []) {
    id
    categories {
      id
      name
    }
    tags
  }
}
***********************************
dictionaryId = 5fbaba339e38ef2a144ec4eb
***********************************
mutation createCategory($files: [Upload]) {
  createCategory(dictionaryId: "5fbaba339e38ef2a144ec4eb", name: "comics", details: "details comics", files: $files) {
    id
    categories {
      id
      name
      imgs {
        filename
      }
    }
  }
}
***********************************
{
  getDictionary(dictionaryId: "5fbaba339e38ef2a144ec4eb") {
    id
    categories {
      id
      name
      details
      imgs {
        mimetype
        filename
      }
    }
    tags
  }
}
***********************************
*/