import { useFollowCursor } from "@/Providers/FollowCursorProvider";
import { PropsWithChildren } from "react";

export default function DisableCursorAnimation({ children}: PropsWithChildren) {
  const { setDisableAnimation } = useFollowCursor();

  return (
    <div onMouseEnter={() => setDisableAnimation(true)} onMouseLeave={() => setDisableAnimation(false)}>
      {children}
    </div>
  );
};
