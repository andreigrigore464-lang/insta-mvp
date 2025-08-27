"use client";

import { useState } from "react";
import Image from "next/image";

type Result = {
  caption: string;
  hashtags: string;
  image: string;
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Failed to generate");

      const data = (await res.json()) as Result;
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">News → Instagram Post Generator</h1>

      <div className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Paste article link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !url}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Post"}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 border rounded-lg max-w-md">
          <h2 className="font-bold mb-2">Generated Post</h2>
          <Image
            src={result.image}
            alt="Generated post preview"
            width={600}
            height={600}
            className="rounded"
          />
          <p className="mt-2 whitespace-pre-line">{result.caption}</p>
          <p className="text-gray-500">{result.hashtags}</p>
        </div>
      )}
    </main>
  );
}
