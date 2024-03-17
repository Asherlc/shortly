"use server";

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
  previousState: FormState,
  formData: FormData
) {
  const originalUrl = formData.get("url");

  const validatedFields = schema.safeParse({
    url: originalUrl,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${process.env.HOSTNAME}/urls`, {
    method: "POST",
    body: JSON.stringify({ url: originalUrl }),
  });

  const responseJson = await response.json();

  return {
    shortenedUrl: responseJson.shortenedUrl,
  };
}
