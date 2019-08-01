import { useLayoutEffect, useState } from 'react';
import * as breakpoints from 'src/breakpoints';

const useScreenInformation = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const listener = () => setWidth(window.innerWidth);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  return {
    width,
    isMobile: width <= breakpoints.points.small,
  };
};

export default useScreenInformation;
