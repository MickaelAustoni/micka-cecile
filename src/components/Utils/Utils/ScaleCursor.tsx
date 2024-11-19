import { useFollowCursor } from "@/Providers/FollowCursorProvider";
import { ReactNode, useEffect } from "react";

export default function ScaleCursor({ children }: { children: ReactNode }) {
  const { setIsHovered } = useFollowCursor();

  // Clean up the isHovered state when the component unmounts
  useEffect(() => {
    return () => setIsHovered(false);
  }, [setIsHovered]);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
    </div>
  );
};
