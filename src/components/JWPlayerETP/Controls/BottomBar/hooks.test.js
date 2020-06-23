import { renderHook } from '@testing-library/react-hooks';
import useSkipTime from './hooks';

describe('useSkipTime', () => {
  const offset = 6;
  it('Should correctly compute skipTime when seekPosition is smaller than 0', () => {
    const { result } = renderHook(props => useSkipTime(props), {
      initialProps: { seekPosition: -4.5678, skipTime: offset },
    });

    expect(result.current).toEqual(false);
  });

  it('Should correctly compute skipTime when seekPosition is equal to 0', () => {
    const { result } = renderHook(props => useSkipTime(props), {
      initialProps: { seekPosition: 0, skipTime: offset },
    });

    expect(result.current).toEqual(offset + 1);
  });

  it('Should correctly compute skipTime when seekPosition is between 0 and skipTime', () => {
    const { result } = renderHook(props => useSkipTime(props), {
      initialProps: { seekPosition: offset - 2.3456, skipTime: offset },
    });

    expect(result.current).toEqual(3);
  });

  it('Should correctly compute skipTime when seekPosition is greater than skipTime', () => {
    const { result } = renderHook(props => useSkipTime(props), {
      initialProps: { seekPosition: offset + 2.3456, skipTime: offset },
    });

    expect(result.current).toEqual(false);
  });
});
