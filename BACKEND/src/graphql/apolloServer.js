import { ApolloServer } from "@apollo/server";
import { userTypeDefs } from "./typeDefs/user.typeDefs.js";
import { userResolvers } from "./resolvers/user.resolvers.js";

const apolloServer = new ApolloServer({
    typeDefs: [userTypeDefs],
    resolvers: [userResolvers],
});


export { apolloServer }
