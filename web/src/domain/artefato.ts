export type EstadoArtefato =
  | "LATENTE"
  | "MANIFESTADO"
  | "CORROMPIDO"
  | "ARQUIVADO";

export type Artefato = {
  id: string;
  titulo: string;
  resumo?: string;
  conteudo: string;
  imagemCapa?: string;
  estado: string;
  criadoEm: string;
};
