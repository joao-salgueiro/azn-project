"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface SocialLinks {
  github: string | null;
  linkedin: string | null;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    github: null,
    linkedin: null,
  });

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/social`);
        if (response.ok) {
          const data = await response.json();
          setSocialLinks(data);
        }
      } catch (error) {
        console.error("Erro ao buscar links sociais:", error);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 mt-20">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-zinc-100 mb-4 tracking-widest">
              <Link
                href={`/about`}
                className="block border border-zinc-800 p-5 hover:border-zinc-500 transition"
                >
                    Sobre
                </Link>
            </h3>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-zinc-100 mb-4 tracking-widest">
              LINKS
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors">
                  Artefatos
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-zinc-100 mb-4 tracking-widest">
              REDES
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href={socialLinks.github || "#"} 
                  target={socialLinks.github ? "_blank" : undefined}
                  rel={socialLinks.github ? "noopener noreferrer" : undefined}
                  className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href={socialLinks.linkedin || "#"} 
                  target={socialLinks.linkedin ? "_blank" : undefined}
                  rel={socialLinks.linkedin ? "noopener noreferrer" : undefined}
                  className="text-zinc-400 text-sm hover:text-zinc-100 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8">
          <p className="text-zinc-500 text-xs font-mono tracking-widest text-center">
            © {currentYear} AZN Project. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
