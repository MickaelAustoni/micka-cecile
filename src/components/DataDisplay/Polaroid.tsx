import Image from "next/image";
import type { ImageProps } from "next/dist/shared/lib/get-img-props";

interface PolaroidProps extends  ImageProps {
  width?: number;
  height?: number;
}

export default function Polaroid({ alt, width = 300, height = 500, ...props } : PolaroidProps) {
  return (
    <div className="border-8">
      <Image
        priority
        width={width}
        height={height}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
        }}
        {...props}
      />
    </div>
  )
}
