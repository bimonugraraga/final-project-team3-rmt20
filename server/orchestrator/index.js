if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("apollo-server");
const earthquakeApiSchema = require("./schema/eqAPI");
const weatherReportSchema = require("./schema/weatherReport");

const server = new ApolloServer({
  typeDefs: [earthquakeApiSchema.typeDefs, weatherReportSchema.typeDefs],
  resolvers: [earthquakeApiSchema.resolvers, weatherReportSchema.resolvers],
});
// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
