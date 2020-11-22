import fileResolvers from './resolvers/file';
import userResolvers from './resolvers/user';

export default {
  Query: {
    hello: () => "Hello world",
    ...fileResolvers.Query
  },
  Mutation: {
    ...fileResolvers.Mutation,
    ...userResolvers.Mutation
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
*/