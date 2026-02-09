import express, { Application, Request, Response, NextFunction } from "express";
import { env } from "./config/env";
import agentRoutes from "./routes/agent.routes";

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

app.listen(Number(env.PORT), () => {
  console.log(`
  🚀 AI Agent Server running!
  
  Environment: ${env.NODE_ENV}
  Port: ${env.PORT}
  `);
});