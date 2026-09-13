"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

export function AssetImage({ available, fallback, alt, ...props }: ImageProps & { available: boolean; fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (!available || failed) return fallback;
  return <Image {...props} alt={alt} onError={() => setFailed(true)} />;
}
