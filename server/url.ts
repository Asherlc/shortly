import { randomBytes } from "crypto";
import postgres, { Sql } from "postgres";

const sql: Sql = postgres();

export async function createShortenedUrl(url: string): Promise<string> {
  const slug: string = randomBytes(5).toString("hex");

  await sql`
    INSERT INTO urls
    (full_url, slug) VALUES
    (${url}, ${slug})
  `;

  const shortenedUrl = new URL(process.env.HOSTNAME!);
  shortenedUrl.pathname = slug;

  return shortenedUrl.toString();
}
