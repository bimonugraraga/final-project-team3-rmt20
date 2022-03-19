if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("apollo-server");
const eqApiSchema = require("./schema/eqAPI");
const weatherApiSchema = require("./schema/weatherAPI");
const userSchema = require("./schema/usersSchema");
const weatherReportSchema = require("./schema/weatherReport");
const eqReportSchema = require("./schema/eqReport");

const server = new ApolloServer({
  typeDefs: [eqApiSchema.typeDefs, userSchema.typeDefs, weatherApiSchema.typeDefs, weatherReportSchema.typeDefs, eqReportSchema.typeDefs],
  resolvers: [eqApiSchema.resolvers, userSchema.resolvers, weatherApiSchema.resolvers, weatherReportSchema.resolvers, eqReportSchema.resolvers],
  // context: ({ req }) => ({
  //   auth: getToken(req.headers),
  // }),
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
