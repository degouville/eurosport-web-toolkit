import screenfull from 'screenfull';
import { renderHook, act } from '@testing-library/react-hooks';
import useFullscreen from './useFullscreen';

jest.mock('screenfull', () => ({
  on: jest.fn(),
  off: jest.fn(),
  request: jest.fn(),
  exit: jest.fn(),
  enabled: true,
}));

describe('Hooks|useFullscreen', () => {
  it('default to false', () => {
    const {
      result: {
        current: [isFullscreen],
      },
    } = renderHook(() => useFullscreen(null));

    expect(isFullscreen).toBe(false);
  });

  describe('Handles onFullscreenChange callback', () => {
    let element;
    beforeEach(() => {
      element = { id: 'elementId' };
      jest.resetAllMocks();
    });

    it('Should do nothing if screenfull is not enabled', () => {
      screenfull.enabled = false;
      const { result } = renderHook(() => useFullscreen(element));

      act(() => {
        result.current[1]();
      });

      expect(screenfull.request).not.toHaveBeenCalledWith(element);
    });

    it('Should request when callback is called when not in fullscreen', () => {
      screenfull.enabled = true;
      const { result } = renderHook(() => useFullscreen(element));

      act(() => {
        result.current[1]();
      });

      expect(screenfull.request).toHaveBeenCalledWith(element);
    });

    it('Should exit when callback is called when in fullscreen', () => {
      screenfull.enabled = true;
      let callback;
      screenfull.on = jest.fn().mockImplementation((event, cb) => {
        callback = cb;
      });
      const { result } = renderHook(() => useFullscreen(element));

      act(() => {
        screenfull.element = element;
        callback();
      });

      act(() => {
        result.current[1]();
      });

      expect(screenfull.exit).toHaveBeenCalled();
      expect(callback).toBeInstanceOf(Function);
    });

    it('Should call webkitEnterFullscreen on iOS devices', () => {
      screenfull.enabled = false;
      const webkitEnterFullscreen = jest.fn();
      // eslint-disable-next-line no-restricted-properties,no-underscore-dangle
      navigator.__defineGetter__('userAgent', () => 'iPhone');
      element = { id: 'elementId', querySelector: jest.fn(() => ({ webkitEnterFullscreen })) };
      const { result } = renderHook(() => useFullscreen(element));

      act(() => {
        result.current[1]();
      });

      expect(webkitEnterFullscreen).toHaveBeenCalled();
      expect(screenfull.request).not.toHaveBeenCalledWith(element);
    });
  });
});
