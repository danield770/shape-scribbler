import React from 'react';

function useDeviceDetect() {
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  React.useEffect(() => {
    if (!window.matchMedia) return;
    setIsTouchDevice(window.matchMedia('(pointer:coarse)').matches);
  }, []);

  return isTouchDevice;
}
export default useDeviceDetect;
