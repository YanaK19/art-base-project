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
mutation uploadFile($file: Upload!) {
  uploadFile(file: $file) {
    path
    id
    filename
    mimetype
  }
}
*/