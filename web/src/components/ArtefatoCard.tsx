import Link from "next/link";
import { Artefato } from "../domain/artefato";

export function ArtefatoCard({ artefato }: { artefato: Artefato }) {
  return (
    <Link
      href={`/a/${artefato.id}`}
      className="block border border-zinc-800 p-5 hover:border-zinc-500 transition"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs tracking-widest text-zinc-500">
          {artefato.criadoEm}
        </span>
        <span className="font-mono text-xs tracking-widest text-zinc-500">
          {artefato.estado}
        </span>
      </div>

      <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight tracking-tight">
        {artefato.titulo}
      </h2>

      <p className="mt-3 text-sm text-zinc-400 line-clamp-2">
        {artefato.imagemCapa ? (
          <img
            src={artefato.imagemCapa}
            alt={artefato.titulo}
            className="mt-3 w-full object-cover rounded-md"
          />
        ) : null}
      </p>
    </Link>
  );
}
