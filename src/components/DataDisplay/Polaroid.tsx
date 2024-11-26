import Image from "next/image";
import type { ImageProps } from "next/dist/shared/lib/get-img-props";

interface PolaroidProps extends  ImageProps {
  priority?: boolean;
}

export default function Polaroid({ alt, priority, ...props } : PolaroidProps) {
  return (
    <div className="border-8 relative sepia w-52 h-72 sm:w-80 sm:h-[30rem]">
      <Image
        fill
        priority={priority}
        sizes="(max-width: 767px) 100vw, 50vw"
        alt={alt}
        className="object-cover "
        {...props}
      />
    </div>
  )
}
