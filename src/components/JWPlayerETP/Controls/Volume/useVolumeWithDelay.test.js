import { renderHook, act } from '@testing-library/react-hooks';
import useVolumeWithDelay from './useVolumeWithDelay';

describe('useVolumeWithDelay', () => {
  it('Should apply the default value', () => {
    // Given
    const { result } = renderHook(props => useVolumeWithDelay(props), { initialProps: true });
    const [showVolume] = result.current;

    // Expect
    expect(showVolume).toEqual(true);
  });

  it('Should apply the new true value instantly', () => {
    // Given
    const { result } = renderHook(props => useVolumeWithDelay(props), { initialProps: false });

    // When
    act(() => {
      const [, setShowVolume] = result.current;
      setShowVolume(true);
    });
    const [showVolume] = result.current;

    // Expect
    expect(showVolume).toEqual(true);
  });

  it('Should apply the new false value with a delay', () => {
    // Given
    jest.useFakeTimers();
    const { result } = renderHook(props => useVolumeWithDelay(props), { initialProps: true });

    // When
    act(() => {
      const [, setShowVolume] = result.current;
      setShowVolume(false);
    });
    act(() => jest.runAllTimers());
    const [showVolume] = result.current;

    // Expect
    expect(showVolume).toEqual(false);
    jest.useRealTimers();
  });

  it('Should not apply the new false value instantly', () => {
    // Given
    const { result } = renderHook(props => useVolumeWithDelay(props), { initialProps: true });

    // When
    act(() => {
      const [, setShowVolume] = result.current;
      setShowVolume(false);
    });
    const [showVolume] = result.current;

    // Expect
    expect(showVolume).toEqual(true);
  });

  it('Should cancel the false update when we set it back to true', () => {
    // Given
    jest.useFakeTimers();
    const { result } = renderHook(props => useVolumeWithDelay(props), { initialProps: true });

    // When
    act(() => {
      const [, setShowVolume] = result.current;
      setShowVolume(false);
    });

    act(() => {
      const [, setShowVolume] = result.current;
      setShowVolume(true);
    });
    act(() => jest.runAllTimers());
    const [showVolume] = result.current;

    // Expect
    expect(showVolume).toEqual(true);
    jest.useRealTimers();
  });
});
