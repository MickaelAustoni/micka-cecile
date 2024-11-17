import { useEffect, useState } from 'react';

/**
 * Hook to check if the device is a touch device
 */
const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const checkIfTouchDevice = () => {

      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        setIsTouchDevice(true);
      } else {
        setIsTouchDevice(false);
      }
    };

    // Initial check
    checkIfTouchDevice();

    // Add event listener for changes in case a device is connected/disconnected
    window.addEventListener('touchstart', checkIfTouchDevice);

    // Cleanup by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('touchstart', checkIfTouchDevice);
    };
  }, []);

  return isTouchDevice;
};

export default useIsTouchDevice
