import fileResolvers from './resolvers/file';
import userResolvers from './resolvers/user';
import artResolvers from './resolvers/art';

export default {
  Query: {
    hello: () => "Hello world",
    ...fileResolvers.Query,
    ...artResolvers.Query
  },
  Mutation: {
    ...fileResolvers.Mutation,
    ...userResolvers.Mutation,
    ...artResolvers.Mutation
  }
};

/* 
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
      title: "School"
      category: "comics"
      albumName: "Meow"
      file: $file
    }) {
    title
    img {
      filename
    }
  }
}
***********************************
*/