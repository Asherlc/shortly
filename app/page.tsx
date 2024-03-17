"use client";

import { useFormState } from "react-dom";
import createUrl, { FormState } from "./actions";

const initialState: FormState = {};

export default function Home() {
  const [state, formAction] = useFormState(createUrl, initialState);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <header>
        <h1 className="text-xl text-slate-700">URL Shortener</h1>
      </header>
      <form
        className="flex flex-col items-center space-y-4"
        action={formAction}
      >
        <label className="flex flex-col text-sm text-slate-700">
          URL
          <input type="url" required name="url" />
        </label>
        <button className="rounded bg-white p-4 text-slate-700">Shorten</button>
      </form>

      {state.errors && (
        <div>
          Errors:
          <ul>
            {state.errors?.url?.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {state.shortenedUrl && (
        <div>
          Success! Your shortened url is{" "}
          <a className="underline" href={state.shortenedUrl}>
            {state.shortenedUrl}
          </a>
        </div>
      )}
    </main>
  );
}
