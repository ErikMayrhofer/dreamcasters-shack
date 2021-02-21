export function lazyImage(url: string, apply: (url: string) => void) {
  const img = new Image();
  img.onload = () => {
    console.log("Apply, ", url);
    apply(url);
  };
  setTimeout(() => {
    img.src = url;
  }, 0);
}
