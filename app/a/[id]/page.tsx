"use client";
import { artefatosMock } from "@/src/data/artefatos";
import { podeArquivar, podeCorromper, podeManifestar } from "@/src/domain/regrasArtefato";
import { useState } from "react";


export default function ArtefatoPage({ params }: { params: { id: string } }) {

  const original = artefatosMock.find((a) => a.id === params.id);
  const [artefato, setArtefato] = useState(original);
  const [erro, setErro] = useState<string | null>(null); //useState é um recipiente de memória do React.

  if (!artefato) return null;


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
          <p className="font-mono text-xs tracking-widest text-zinc-500">{artefato.criadoEm}</p>
          <p className="font-mono text-xs tracking-widest text-zinc-500">{artefato.estado}</p>
        </div>

        <h1 className="mt-4 text-4xl font-semibold leading-tight">{artefato.titulo}</h1>

        <article className="mt-8 text-base leading-relaxed text-zinc-200 whitespace-pre-line">
          {artefato.conteudo}
        </article>
      </div>
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

    </main>
  );
}
