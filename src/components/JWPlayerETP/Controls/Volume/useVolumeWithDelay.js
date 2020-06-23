import { useEffect, useState } from 'react';

const useVolumeWithDelay = initialState => {
  const [showVolume, setShowVolume] = useState(initialState);
  const [willShowVolume, setWillShowVolume] = useState(initialState);

  useEffect(() => {
    if (willShowVolume === false) {
      const timer = setTimeout(() => setShowVolume(false), 200);
      return () => clearTimeout(timer);
    }
    setShowVolume(true);
    return undefined;
  }, [willShowVolume, setShowVolume]);

  return [showVolume, setWillShowVolume];
};

export default useVolumeWithDelay;
