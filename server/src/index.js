import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
// Import database configuration
import connect from "./db";

export default (async function () {
  try {
    // mongodb
    await connect.then(() => {
      console.log("Connected 🚀 To MongoDB Successfully");
    });

    // apollo-server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    
    server.listen(4000, () => {
      console.log(`🚀 server running @ http://localhost:4000`);
    });
  } catch (err) {
    console.error(err);
  }
})();