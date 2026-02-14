import express, { Application, Request, Response, NextFunction } from "express";
import { env } from "./config/env";
import agentRoutes from "./routes/agent.routes";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use("/api/agent", agentRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.json({ 
    status: "okay!", 
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).json({ 
    error: "Internal server error",
    message: env.NODE_ENV === "development" ? err.message : undefined
  });
});


async function startServer() {
  // Crear Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Iniciar Apollo Server (requiere await)
  await apolloServer.start();

  // Agregar endpoint / graphql a Express
  app.use("/graphql", cors(), express.json(), expressMiddleware(apolloServer));

  app.listen(Number(env.PORT), () => {
    console.log(`
    🚀 AI Agent Server running!
    
    Environment: ${env.NODE_ENV}
    Port: ${env.PORT}

    REST:    http://localhost:${env.PORT}/api/agent
    GraphQL: http://localhost:${env.PORT}/graphql
    `);
  });
}

startServer().catch(console.error);
