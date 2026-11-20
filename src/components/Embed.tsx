export function Embed({ src, className, title }: { src: string; className?: string; title?: string }) {
  return (
    <iframe
      className={className}
      src={src}
      title={title ?? src}
      loading="eager"
      style={{ width: "100%", height: "100%", border: "none", display: "block" }}
    />
  );
}
