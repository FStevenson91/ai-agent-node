import express, { Application, Request, Response, NextFunction } from "express";
import { env } from "./config/env";
import agentRoutes from "./routes/agent.routes";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware simple
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/agent", agentRoutes);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV
  });
});

// Error handler global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).json({ 
    error: "Internal server error",
    message: env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Start server
app.listen(Number(env.PORT), () => {
  console.log(`
  🚀 AI Agent Server running!
  
  Environment: ${env.NODE_ENV}
  Port: ${env.PORT}
  
  Endpoints:
  - POST /api/agent/chat     → Chat with the agent
  - GET  /api/agent/session/:id → Get session history
  - GET  /api/agent/sessions → List all sessions
  - GET  /health             → Health check
  `);
});