import { renderHook } from '@testing-library/react-hooks';
import useClickOutside from './useClickOutside';

describe('useClickOutside', () => {
  let map;

  beforeEach(() => {
    map = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    window.removeEventListener = jest.fn();
  });

  it('Should call the callback when the click is outside', () => {
    // Given
    const ref = {
      current: {
        contains: jest.fn(() => false),
      },
    };
    const callback = jest.fn();
    renderHook(props => useClickOutside(props), { initialProps: { ref, callback } });

    // When
    map.click({ target: '' });

    // Expect
    expect(callback).toHaveBeenCalled();
  });

  it('Should not call the callback when the click is inside', () => {
    // Given
    const ref = {
      current: {
        contains: jest.fn(() => true),
      },
    };
    const callback = jest.fn();
    renderHook(props => useClickOutside(props), { initialProps: { ref, callback } });

    // When
    map.click({ target: '' });

    // Expect
    expect(callback).not.toHaveBeenCalled();
  });

  it('Should remove the event listener when value change', () => {
    // Given
    const ref = {
      current: {
        contains: jest.fn(() => true),
      },
    };
    const { rerender } = renderHook(props => useClickOutside(props), { initialProps: { ref, callback: jest.fn() } });

    // When
    const callback = jest.fn();
    rerender({ ref, callback });

    // Expect
    expect(window.removeEventListener).toHaveBeenCalledWith('click', expect.any(Function));
  });
});
