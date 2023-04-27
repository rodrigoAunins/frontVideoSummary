export function validarUrlYoutube(valor){
    return valor.trim() && /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(valor);
}