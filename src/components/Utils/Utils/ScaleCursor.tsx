import { useFollowCursor } from "@/Providers/FollowCursorProvider";
import { PropsWithChildren, useEffect } from "react";

interface ScaleCursorProps  extends PropsWithChildren {
  cleanupOnUnmount?: boolean;
}

export default function ScaleCursor({ children, cleanupOnUnmount }: ScaleCursorProps) {
  const { setIsHovered } = useFollowCursor();

  // Clean up the isHovered state when the component unmounts
  useEffect(() => {
    return () => {
      if (cleanupOnUnmount) {
        //setIsHovered(false);
      }
    };
  }, [cleanupOnUnmount, setIsHovered]);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
    </div>
  );
};
