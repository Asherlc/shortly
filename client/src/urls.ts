"use client";

import { z } from "zod";

export interface FormState {
  errors?: {
    url?: string[];
  };
  shortenedUrl?: string;
}

const schema = z.object({
  url: z.string().url(),
});

export default async function createUrl(
  originalUrl: string
): Promise<FormState> {
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

  return {
    shortenedUrl: responseJson.shortenedUrl,
  };
}
