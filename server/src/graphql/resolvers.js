const fileResolvers = require('./resolvers/file');

export default {
  Query: {
    hello: () => "Hello world",
    ...fileResolvers.Query
  },
  Mutation: {
    ...fileResolvers.Mutation
  }
};

/* 
mutation uploadFile($file: Upload!) {
  uploadFile(file: $file) {
    path
    id
    filename
    mimetype
  }
}
*/