"use client";

import { podeArquivar, podeCorromper, podeManifestar } from "@/src/domain/regrasArtefato";
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

    fetch(`http://localhost:8080/artefatos/${id}`)
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
          className="prose prose-invert max-w-none mt-10"
          dangerouslySetInnerHTML={{ __html: artefato.conteudo }}
        />

        {erro && (
          <p className="text-red-500 mt-6 text-sm">{erro}</p>
        )}

        <div className="mt-10 flex gap-3 flex-wrap">
          <button
            disabled={!podeManifestar(artefato.estado)}
            onClick={() => {
              if (!podeManifestar(artefato.estado)) {
                setErro("Não é possível manifestar neste estado.");
                return;
              }
              setArtefato({ ...artefato, estado: "MANIFESTADO" });
              setErro(null);
            }}
            className="border px-4 py-2 disabled:opacity-30"
          >
            Manifestar
          </button>

          <button
            disabled={!podeCorromper(artefato.estado)}
            onClick={() => {
              if (!podeCorromper(artefato.estado)) {
                setErro("Somente manifestados podem ser corrompidos.");
                return;
              }
              setArtefato({ ...artefato, estado: "CORROMPIDO" });
              setErro(null);
            }}
            className="border px-4 py-2 disabled:opacity-30"
          >
            Corromper
          </button>

          <button
            disabled={!podeArquivar(artefato.estado)}
            onClick={() => {
              if (!podeArquivar(artefato.estado)) {
                setErro("Apenas corrompidos podem ser arquivados.");
                return;
              }
              setArtefato({ ...artefato, estado: "ARQUIVADO" });
              setErro(null);
            }}
            className="border px-4 py-2 disabled:opacity-30"
          >
            Arquivar
          </button>
        </div>
      </div>
    </main>
  );
}
