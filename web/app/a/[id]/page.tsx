"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Artefato = {
  id: number;
  titulo: string;
  resumo?: string;
  conteudo: string;
  imagem_capa?: string;
  estado: string;
  criado_em: string;
};

export default function ArtefatoPage() {
  const { id } = useParams<{ id: string }>();

  const [artefato, setArtefato] = useState<Artefato | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/artefatos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Não encontrado");
        return res.json();
      })
      .then(data => setArtefato(data))
      .catch(() => setArtefato(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center">
        <p className="font-mono text-sm text-zinc-500">Carregando...</p>
      </main>
    );
  }

  if (!artefato) {
    return (
      <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center">
        <p className="font-mono text-sm text-zinc-500">ARTEFATO NÃO ENCONTRADO</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 py-12">

        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-widest text-zinc-500">
            {new Date(artefato.criado_em).toLocaleDateString()}
          </p>
          <p className="font-mono text-xs tracking-widest text-zinc-500">
            {artefato.estado}
          </p>
        </div>

        <h1 className="text-5xl font-bold mt-12">
          {artefato.titulo}
        </h1>

        {artefato.resumo && (
          <p className="text-xl text-zinc-400 mt-4">
            {artefato.resumo}
          </p>
        )}

        {artefato.imagem_capa && (
          <img
            src={artefato.imagem_capa}
            className="mt-10 w-full max-h-[500px] object-cover rounded"
          />
        )}

        <div
          className="prose prose-invert max-w-none mt-10 [&>p]:mb-4 [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3"
          dangerouslySetInnerHTML={{ __html: artefato.conteudo }}
        />

        {erro && (
          <p className="text-red-500 mt-6 text-sm">{erro}</p>
        )}
      </div>
    </main>
  );
}
