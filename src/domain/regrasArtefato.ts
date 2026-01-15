import { EstadoArtefato } from "./artefato";

export function podeManifestar(estado: EstadoArtefato) {
    return estado === "LATENTE";
}

export function podeCorromper(estado: EstadoArtefato) {
    return estado === "MANIFESTADO";
}

export function podeArquivar(estado: EstadoArtefato) {
    return estado === "CORROMPIDO";
}