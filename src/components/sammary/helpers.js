export function validarUrlYoutube(valor){
    return valor.trim() && /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(valor);
}

export function getVideoId(url) {
    const match = url.match(/youtube\.com\/watch\?v=(\w+)/);
    return match ? match[1] : null;
  }