"use client";

import { ArtefatoCard } from "../src/components/ArtefatoCard";
import { useEffect, useState } from "react";
import type {
  Artefato,
  EstadoArtefato,
} from "../src/domain/artefato";

type ApiArtefato = {
  id?: number;
  titulo: string;
  resumo?: string;
  conteudo?: string;
  estado?: string;
  criado_em: string;
};

export default function Home() {
  const [artefatos, setArtefatos] = useState<Artefato[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArtefatos() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artefatos`);
        if (!response.ok) throw new Error("Erro ao buscar artefatos");

        const data: ApiArtefato[] = await response.json();

        const normalized: Artefato[] = data.map((a, index) => ({
        id: String(a.id ?? index),
        titulo: a.titulo,
        resumo: a.resumo,
        conteudo: a.conteudo ?? "",
        imagemCapa: (a as any).imagem_capa,
        estado: (a.estado ?? "rascunho") as EstadoArtefato,
        criadoEm: a.criado_em,
      }));


        setArtefatos(normalized);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArtefatos();
  }, []);

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <header className="border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
            Arquivo Zona Null · índice
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-[0.95]">
            AZN
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-zinc-400">
            Um arquivo editorial de artefatos: manifestos, ruínas e sinais.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 space-y-4">
        {loading && (
          <p className="text-zinc-500 text-sm">Carregando artefatos...</p>
        )}

        {error && (
          <p className="text-red-500 text-sm">
            Erro ao carregar: {error}
          </p>
        )}

        {!loading &&
          !error &&
          artefatos.map((a) => (
            <ArtefatoCard key={a.id} artefato={a} />
          ))}

        {!loading && !error && artefatos.length === 0 && (
          <p className="text-zinc-500 text-sm">
            Nenhum artefato encontrado no banco.
          </p>
        )}
      </section>
    </main>
  );
}
