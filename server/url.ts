import { randomBytes } from "crypto";
import postgres, { Sql } from "postgres";

const sql: Sql = postgres({
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: "host.docker.internal",
});

export async function createShortenedUrl(url: string): Promise<string> {
  const slug: string = randomBytes(5).toString("hex");

  await sql`
    INSERT INTO urls
    (url, slug) VALUES
    (${url}, ${slug})
  `;

  const shortenedUrl = new URL(process.env.HOSTNAME!);
  shortenedUrl.pathname = slug;

  return shortenedUrl.toString();
}

export async function getOriginalUrl(slug: string): Promise<string | null> {
  const result = await sql`
    SELECT url
    FROM urls
    WHERE slug = ${slug}
  `;

  if (result.length === 0) {
    return null;
  }

  return result[0].url;
}
