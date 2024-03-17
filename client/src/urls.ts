"use client";

import { z } from "zod";

const schema = z.object({
  url: z.string().url(),
});

export default async function createUrl(originalUrl: string): Promise<string> {
  schema.parse({
    url: originalUrl,
  });

  const response = await fetch(`/api/urls`, {
    method: "POST",
    body: JSON.stringify({ url: originalUrl }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();

  return responseJson.shortenedUrl;
}
