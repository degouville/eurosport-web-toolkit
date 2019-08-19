import { useLayoutEffect } from 'react';

const useClickOutside = ({ ref, callback }) =>
  useLayoutEffect(() => {
    const listener = event => ref.current && !ref.current.contains(event.target) && callback();
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, [ref, callback]);

export default useClickOutside;
