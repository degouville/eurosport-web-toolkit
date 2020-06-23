import screenfull from 'screenfull';
import { useCallback, useState, useLayoutEffect } from 'react';

export function iOS() {
  return /iPad|iPhone|iPod/i.test(navigator.userAgent);
}

const useFullscreen = containerElement => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useLayoutEffect(() => {
    if (!screenfull.enabled) return undefined;
    setIsFullscreen(containerElement === screenfull.element);
    const handleFullscreenChange = () => {
      setIsFullscreen(containerElement === screenfull.element);
    };

    screenfull.on('change', handleFullscreenChange);
    return () => {
      screenfull.off('change', handleFullscreenChange);
    };
  }, [isFullscreen, containerElement]);

  const onFullscreenChange = useCallback(() => {
    if (iOS() && containerElement?.querySelector?.('.jw-video')?.webkitEnterFullscreen) {
      containerElement.querySelector('.jw-video').webkitEnterFullscreen();
      return;
    }

    if (!screenfull.enabled) return;
    if (isFullscreen) {
      screenfull.exit();
    } else if (containerElement) {
      screenfull.request(containerElement);
    }
  }, [containerElement, isFullscreen]);

  return [isFullscreen, onFullscreenChange];
};

export default useFullscreen;
