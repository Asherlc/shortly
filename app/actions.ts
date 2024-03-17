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
  const validatedFields = schema.safeParse({
    url: formData.get("url"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return {
    shortenedUrl: "123",
  };
}
