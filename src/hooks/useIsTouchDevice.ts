import { useState } from 'react';
import useEventListener from "@/hooks/useEventListener";
import { useIsomorphicLayoutEffect } from "framer-motion";

/**
 * Hook to check if the device is a touch device
 */
const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const checkIfTouchDevice = () => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return
    }

    setIsTouchDevice(false);
  };

  useEventListener("touchstart", checkIfTouchDevice);
  useEventListener("resize", checkIfTouchDevice);

  useIsomorphicLayoutEffect(() => {
    checkIfTouchDevice();
  },[]);

  return isTouchDevice;
};

export default useIsTouchDevice
