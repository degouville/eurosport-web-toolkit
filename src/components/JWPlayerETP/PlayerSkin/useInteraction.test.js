import { renderHook, act } from '@testing-library/react-hooks';
import useInteraction from './useInteraction';

describe('Hooks|useInteraction', () => {
  // Event code keys are provided by the w3 RFC here: https://www.w3.org/TR/2014/WD-DOM-Level-3-Events-20140925/#widl-KeyboardEvent-keyCode
  describe('Should be active when keys are pressed with isPlaying to true', () => {
    let result;

    beforeEach(() => {
      // Given
      // eslint-disable-next-line prefer-destructuring
      result = renderHook(() => useInteraction()).result;
    });

    it('Should set the children as active when left pressed', () => {
      // When
      act(() => {
        result.current.onKeyUp({ keyCode: 37 });
      });

      // Expect
      expect(result.current.active).toBe(true);
    });

    it('Should set the children as active when right pressed', () => {
      // When
      act(() => {
        result.current.onKeyUp({ keyCode: 39 });
      });

      // Expect
      expect(result.current.active).toBe(true);
    });

    it('Should set the children as active when tab pressed', () => {
      // When
      act(() => {
        result.current.onKeyUp({ keyCode: 9 });
      });

      // Expect
      expect(result.current.active).toBe(true);
    });

    it('Should set the children as active when enter pressed', () => {
      // When
      act(() => {
        result.current.onKeyUp({ keyCode: 37 });
      });

      // Expect
      expect(result.current.active).toBe(true);
    });
  });

  describe('Dismiss the timer after timeout', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('Should set active to false after timeout', () => {
      // Given
      const { result } = renderHook(() => useInteraction());

      // When
      act(() => {
        result.current.onKeyUp({ keyCode: 13 });
      });
      act(() => {
        jest.runAllTimers();
      });

      // Expect
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(result.current.active).toBe(false);
    });

    it('Should clear the timer at each event', () => {
      // Given
      const { result } = renderHook(() => useInteraction());

      // When
      act(() => {
        result.current.onKeyUp({ keyCode: 13 });
      });
      act(() => {
        jest.runOnlyPendingTimers();
      });
      act(() => {
        result.current.onKeyUp({ keyCode: 37 });
      });

      // Expect
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(result.current.active).toBe(true);
    });

    describe('Lock / Unlock state', () => {
      it('Should lock the active status', () => {
        // Given
        const { result } = renderHook(() => useInteraction());

        // When
        act(() => {
          result.current.lockInteraction();
        });

        // Expect
        expect(result.current.active).toBe(true);
      });

      it('Should unlock the active status and delay it', () => {
        // Given
        const { result } = renderHook(() => useInteraction());

        // When
        act(() => {
          result.current.unLockInteraction();
        });

        // Expect
        expect(result.current.active).toBe(true);
      });

      it('Should remove the delayed status after x seconds', () => {
        // Given
        const { result } = renderHook(() => useInteraction());

        // When
        act(() => {
          result.current.unLockInteraction();
        });
        act(() => {
          jest.runAllTimers();
        });

        // Expect
        expect(result.current.active).toBe(false);
      });
    });

    describe('handlePlayerInteraction', () => {
      it('Should set active state', () => {
        // Given
        const { result } = renderHook(() => useInteraction());

        // When
        act(() => {
          result.current.handlePlayerInteraction();
        });

        // Expect
        expect(result.current.active).toBe(true);
      });

      it('Should remove the active state after x seconds', () => {
        // Given
        const { result } = renderHook(() => useInteraction());

        // When
        act(() => {
          result.current.handlePlayerInteraction();
        });
        act(() => {
          jest.runAllTimers();
        });

        // Expect
        expect(result.current.active).toBe(false);
      });
    });
  });
});
