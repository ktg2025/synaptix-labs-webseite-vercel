/**
 * Vercel Serverless Function Entrypoint
 * ======================================
 * Vercel routet alle /api/* Requests hierher (siehe vercel.json).
 * Wir bauen einmalig die Express-App auf und cachen sie über Function-
 * Invocations (`app` lebt im "warm" Container weiter).
 *
 * Typing-Hinweis:
 * - Vercel ruft den Handler mit Node.js `IncomingMessage` / `ServerResponse` auf.
 * - Express akzeptiert diese als Aufrufargumente — wir typen den Handler also
 *   bewusst auf die Node-Primitives, nicht auf Express's eigene Request/Response.
 * - Das vermeidet Type-Konflikte mit @vercel/node.
 */
import "dotenv/config";
import express from "express";
import type { IncomingMessage, ServerResponse } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { registerStorageProxy } from "../server/_core/storageProxy";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

let cachedApp: ReturnType<typeof express> | null = null;

function buildApp() {
  const app = express();

  // Body-Parser mit grossem Limit für File-Uploads (analog zum lokalen Server)
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Eigene Routen
  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  return app;
}

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (!cachedApp) {
    cachedApp = buildApp();
  }
  // Express's app() Funktion akzeptiert (req, res) - wir casten zu any, weil
  // Vercel's IncomingMessage und Express's Request technisch kompatibel sind,
  // die Type-Definitionen aber leicht abweichen.
  return (cachedApp as any)(req, res);
}
