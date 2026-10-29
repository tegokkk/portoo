import type { ImgHTMLAttributes } from "react"

function webp(src: string) {
  return src.replace(/\.(png|jpe?g)$/i, ".webp")
}

export function PortfolioImage({
  src,
  alt,
  loading = "lazy",
  decoding = "async",
  sizes = "(max-width: 640px) 100vw, 50vw",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  const source = webp(src)

  return (
    <picture>
      {source !== src ? <source srcSet={source} type="image/webp" sizes={sizes} /> : null}
      <img src={src} alt={alt} loading={loading} decoding={decoding} sizes={sizes} {...props} />
    </picture>
  )
}
