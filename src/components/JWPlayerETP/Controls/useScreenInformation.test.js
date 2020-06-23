import { renderHook, act } from '@testing-library/react-hooks';
import * as breakpoints from 'src/breakpoints';
import useScreenInformation from './useScreenInformation';

jest.mock('src/breakpoints');

describe('Hooks|useScreenInformation', () => {
  const getAddEventListener = type => window.addEventListener.mock.calls.find(array => array[0] === type);

  describe('Width', () => {
    it('Should have innerWidth by default', () => {
      // Given
      window.innerWidth = 42;
      const { result } = renderHook(() => useScreenInformation());

      // Expect
      expect(result.current.width).toBe(42);
    });

    it('Should update width on resize', () => {
      // Given
      window.innerWidth = 42;
      window.addEventListener = jest.fn();
      const { result } = renderHook(() => useScreenInformation());

      // When
      act(() => {
        window.innerWidth = 1001;
        getAddEventListener('resize')[1]();
      });

      // Expect
      expect(result.current.width).toBe(1001);
    });

    it('Should remove resize event listener on unmount', () => {
      // Given
      window.removeEventListener = jest.fn();
      const { unmount } = renderHook(() => useScreenInformation());

      // When
      unmount();

      // Expect
      expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });
  });

  describe('isMobile', () => {
    it('Should be true if width is under breakpoints small', () => {
      // Given
      breakpoints.points.small = 1000;
      window.innerWidth = 900;
      const { result } = renderHook(() => useScreenInformation());

      // Expect
      expect(result.current.isMobile).toBe(true);
    });

    it('Should be false if width is bigger than breakpoints small', () => {
      // Given
      breakpoints.points.small = 1000;
      window.innerWidth = 2000;
      const { result } = renderHook(() => useScreenInformation());

      // Expect
      expect(result.current.isMobile).toBe(false);
    });
  });
});
