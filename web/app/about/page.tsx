"use client";

import { useEffect, useState } from "react";

type AboutData = {
  content: string;
};

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setAbout(data))
      .catch(() => setAbout(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center">
        <p className="font-mono text-sm text-zinc-500">Carregando...</p>
      </main>
    );
  }

  if (!about) {
    return (
      <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center">
        <p className="font-mono text-sm text-zinc-500">Conteúdo não encontrado</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Sobre o AZN Project</h1>
        <div
          className="prose prose-invert max-w-none [&>p]:mb-4 [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3"
          dangerouslySetInnerHTML={{ __html: about.content }}
        />
      </div>
    </main>
  );
}