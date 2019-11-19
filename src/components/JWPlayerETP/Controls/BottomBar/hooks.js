import { useMemo } from 'react';

const useSkipTime = ({ seekPosition, skipTime }) =>
  useMemo(() => {
    if (seekPosition < 0) return false;

    const offset = skipTime - seekPosition;

    if (offset < 0 || offset > skipTime) return false;
    return Math.trunc(skipTime + 1 - seekPosition);
  }, [seekPosition, skipTime]);

export default useSkipTime;
