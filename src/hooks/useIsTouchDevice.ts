import { useState } from 'react';
import useEventListener from "@/hooks/useEventListener";

/**
 * Hook to check if the device is a touch device
 */
const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const checkIfTouchDevice = () => {

    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
    } else {
      setIsTouchDevice(false);
    }
  };

  useEventListener("touchstart", checkIfTouchDevice);

  return isTouchDevice;
};

export default useIsTouchDevice
