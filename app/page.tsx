export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <header>
        <h1 className="text-xl text-slate-700">URL Shortener</h1>
      </header>
      <form className="flex flex-col items-center space-y-4">
        <label className="flex flex-col text-sm text-slate-700">
          URL
          <input type="url" required />
        </label>
        <button className="rounded bg-white p-4 text-slate-700">Shorten</button>
      </form>
    </main>
  );
}
