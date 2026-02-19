import { EstadoArtefato } from "./artefato";

export function podeManifestar(estado: string) {
    return estado === "LATENTE";
}

export function podeCorromper(estado: string) {
    return estado === "MANIFESTADO";
}

export function podeArquivar(estado: string) {
    return estado === "CORROMPIDO";
}