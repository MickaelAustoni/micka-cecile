import Image from "next/image";
import type { ImageProps } from "next/dist/shared/lib/get-img-props";

interface PolaroidProps extends  ImageProps {
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function Polaroid({ alt, priority, width = 300, height = 450, ...props } : PolaroidProps) {
  return (
    <div className="border-8 relative sepia" style={{width: `${width}px`, height: `${height}px`}}>
      <Image
        fill
        priority={priority}
        sizes="(max-width: 767px) 100vw, 50vw"
        alt={alt}
        style={{ objectFit: "cover" }}
        {...props}
      />
    </div>
  )
}
