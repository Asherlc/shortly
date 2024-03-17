import express, { Express, Request, Response } from "express";
import { createShortenedUrl } from "./url";

const app: Express = express();
const port = process.env.PORT || 3000;

app.post("/api/urls", async (req: Request, res: Response) => {
  const shortenedUrl = await createShortenedUrl(req.body.url);

  res.status(201).json({ shortenedUrl });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
