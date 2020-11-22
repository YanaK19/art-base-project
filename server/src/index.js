import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
// Import database configuration
import connect from "./db";

import express from "express";
import cors from "cors"; // import cors
import path from "path";

const app = express();

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

    const dir = path.join(process.cwd(), "images");
    app.use("/images", express.static(dir)); // serve all files in the /images directory
    app.use(cors("*")); // All Cross-origin resource sharing from any network
    
    server.applyMiddleware({ app }); // apply express as a graphql middleware
    // server.listen(4000, () => {
    app.listen(4000, () => {
      console.log(`🚀 server running @ http://localhost:4000`);
    });
  } catch (err) {
    console.error(err);
  }
})();