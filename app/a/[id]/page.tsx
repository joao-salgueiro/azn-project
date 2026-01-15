"use client"; //NEXT.JS(app router) marca esse arquivo como client component - BROWSER  - usar quando quiser UseState() ou OnClick() interatividades no geral
import { artefatosMock } from "@/src/data/artefatos"; //importa um array de artefatos mockados
import { podeArquivar, podeCorromper, podeManifestar } from "@/src/domain/regrasArtefato";
import { useState } from "react"; //importa o useState que é responsável por criar memória reativa dentro do componente (por exemplo mudar o artefato sem ter que recarregar a página
//“Sem useState, nada muda ao vivo. Com useState, o estado vira imagem.”)
import { useParams } from "next/navigation";



export default function ArtefatoPage({ params }: { params: { id: string } }) { //os params vem de next.js (app router). O next injeta params baseado no ID 

  const { id } = useParams<{ id: string }>();
  const original = artefatosMock.find((a) => a.id === id); //javascript puro buscando o artefato pelo id do params (URL)
  const [artefato, setArtefato] = useState(original); //useState é um recipiente de memória do React.
  const [erro, setErro] = useState<string | null>(null); //typescript + react  / guarda um mensagem de erro ou nada 

  console.log(id)
  console.log(artefatosMock)
  console.log(original)
  console.log(artefato);


  if (!artefato) { //se não encontrar o artefato (ou seja null)
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
