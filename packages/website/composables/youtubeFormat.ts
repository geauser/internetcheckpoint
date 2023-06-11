export const useYoutubeFormat = (number: number) => {
  if (number >= 1e6) {
      return `${(number / 1e6).toFixed(0)}M`;
  } else if (number >= 1e3) {
      const value = (number / 1e3).toFixed(1);
      return `${Math.round(parseInt(value.endsWith('.0') ? value.slice(0, -2) : value))}K`;
  } else {
      return number.toString();
  }
}
