import { useCallback, useState } from "react";
import useEventListener from "@/hooks/useEventListener";

/**
 * Returns the current mouse position
 */
const useFollowPointer = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setX(e.pageX);
    setY(e.pageY);
  }, []);

  useEventListener("pointermove", handleMouseMove);

  return { x, y };
};

export default useFollowPointer;
