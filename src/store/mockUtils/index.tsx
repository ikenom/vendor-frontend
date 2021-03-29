export const sleep = (milliSec: number) => new Promise(resolve => setTimeout(resolve, milliSec))

export const hashCode = (text: string): number => {
  let hash = 0;
  if (text.length == 0) {
      return hash;
  }
  for (let i = 0; i < text.length; i++) {
      let char = text.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}