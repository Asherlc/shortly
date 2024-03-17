import express, { Express, Request, Response } from "express";
import { createShortenedUrl, getOriginalUrl } from "./url";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post("/api/urls", async (req: Request, res: Response) => {
  const shortenedUrl = await createShortenedUrl(req.body.url);

  res.status(201).json({ shortenedUrl });
});

app.get("/:slug", async (req: Request, res: Response) => {
  const originalUrl = await getOriginalUrl(req.params.slug);

  if (originalUrl) {
    res.redirect(301, originalUrl);
  } else {
    res.status(404).send("Not found");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
