"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Link ➝ Instagram Post MVP</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex space-x-2">
        <input
          type="url"
          required
          placeholder="Paste article URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow border rounded-xl p-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          Go
        </button>
      </form>

      {loading && <p className="mt-4">Generating...</p>}

      {result && (
        <div className="mt-6 w-full max-w-md p-4 border rounded-xl bg-white shadow">
          <img src={result.image} alt="Generated" className="w-full rounded-xl" />
          <h2 className="text-lg font-semibold mt-2">Caption</h2>
          <p className="text-gray-700 whitespace-pre-line">{result.caption}</p>
          <h2 className="text-lg font-semibold mt-2">Hashtags</h2>
          <p className="text-gray-600">{result.hashtags}</p>
        </div>
      )}
    </div>
  );
}
