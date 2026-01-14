import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center">
      <div className="border border-zinc-700 p-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">AZN</h1>

        <p className="text-sm text-zinc-400 mb-4">
          Toda tecnologia esquecida retorna como ruína.
        </p>

        <button className="border border-zinc-600 px-4 py-2 hover:bg-zinc-800">
          Manifestar artefato
        </button>
      </div>
    </main>
  );
}