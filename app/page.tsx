import { ArtefatoCard } from "../src/components/ArtefatoCard";
import { artefatosMock  } from "../src/data/artefatos";


export default function Home() {
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
        {artefatosMock.map((a) => (
          <ArtefatoCard key={a.id} artefato={a} />
        ))}
      </section>
    </main>
  );
}
