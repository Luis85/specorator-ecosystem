import { useEffect, useState } from "react";

// Prepend Astro's base path to absolute image paths so client-rendered
// components resolve correctly when the site is served from a subdirectory.
const withBase = (path: string) => {
  if (!path || !path.startsWith("/")) return path;
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  return `${base}${path}`;
};

const ImageFallback = (props: any) => {
  const { src, fallback, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(withBase(src));

  useEffect(() => {
    setImgSrc(withBase(src));
  }, [src]);

  return (
    <img
      {...rest}
      src={imgSrc}
      onError={() => {
        if (fallback) setImgSrc(withBase(fallback));
      }}
    />
  );
};

export default ImageFallback;
