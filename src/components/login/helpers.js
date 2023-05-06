export function validarEmail(valor) {
    return valor.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

export function validarPassword(valor) {
    return valor.trim() !== "" && valor.length >= 8;
}