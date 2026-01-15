export type EstadoArtefato =
  | "LATENTE"
  | "MANIFESTADO"
  | "CORROMPIDO"
  | "ARQUIVADO";

export type Artefato = {
  id: string;
  titulo: string;
  conteudo: string;
  estado: EstadoArtefato;
  criadoEm: string; 
};
