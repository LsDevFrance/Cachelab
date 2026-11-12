// j'ai utiliser l'algo djb2 pour prendree en compte l'ordre des caracteres
export function hash(key: string, capacity: number): number {
  let h = 5381;
  for (let i = 0; i < key.length; i++) {
    h = (h * 33 + key.charCodeAt(i)) >>> 0; // >>> 0 car j'ai une erreur si le nombre est trop grand
  }
  return h % capacity;
}
