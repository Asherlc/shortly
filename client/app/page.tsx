"use client";

import { useState } from "react";
import createUrl from "../src/urls";
import { ZodError } from "zod";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<ZodError<{ url: string }> | null>();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <header>
        <h1 className="text-xl text-slate-700">URL Shortener</h1>
      </header>
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();

          setErrors(null);

          try {
            const newShortenedUrl = await createUrl(originalUrl || "");
            setShortenedUrl(newShortenedUrl);
          } catch (e) {
            if (e instanceof ZodError) {
              setErrors(e);
            } else {
              throw e;
            }
          }
        }}
      >
        <label className="flex flex-col text-sm text-slate-700">
          URL
          <input
            className="h-full rounded-md border-0 p-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            type="url"
            required
            onChange={(e) => {
              setOriginalUrl(e.target.value);
            }}
          />
        </label>
        <button className="rounded bg-white p-4 text-slate-700">Shorten</button>
      </form>

      {errors && (
        <div>
          Errors:
          <ul>
            {errors.flatten().fieldErrors?.url?.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {shortenedUrl && (
        <div className="flex flex-col items-center space-y-4">
          <div>
            Success! Your shortened url is{" "}
            <a className="underline" href={shortenedUrl}>
              {shortenedUrl}
            </a>
          </div>
          <button
            className="rounded bg-white p-2 text-slate-700"
            onClick={() => {
              navigator.clipboard.writeText(shortenedUrl);
            }}
          >
            Copy
          </button>
        </div>
      )}
    </main>
  );
}
