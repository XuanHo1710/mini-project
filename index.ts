import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";

import { ApolloServer, gql } from "apollo-server-express";

import { typeDefs } from "./typeDefs/index.typeDef";
import { resolvers } from "./resolvers/index.resolver";

import { requireAuth } from "./middlewares/auth.middleware";


const startServer = async () =>{

    dotenv.config();
    
    database.connect();
    
    const app: Express = express();
    const port: number | string = process.env.PORT || 3000;

    // Graphql
    app.use("/graphql", requireAuth);


    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        introspection: true,
        context: ({ req }) => req
    });
    
    await apolloServer.start();

    apolloServer.applyMiddleware({
        app: app,
        path: "/graphql"
    });
    
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
}

startServer();