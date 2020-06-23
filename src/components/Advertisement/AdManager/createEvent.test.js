import createEvent from './createEvent';
import * as events from './ad-events';

jest.useFakeTimers();

const createGetGooglePublisherTagInstanceMock = patch => ({
  cmd: [],
  apiReady: true,
  ...patch,
});

describe('createEvent', () => {
  it(`Should create/dispatch ${events.INJECT_AD_SLOT} custom event and call callback function`, () => {
    // Given
    const callback = jest.fn();
    const getGooglePublisherTagInstanceMock = createGetGooglePublisherTagInstanceMock();

    // When
    window.addEventListener(events.INJECT_AD_SLOT, callback);
    createEvent(getGooglePublisherTagInstanceMock, events.INJECT_AD_SLOT);
    jest.runAllTimers();

    // Expect
    expect(callback).toHaveBeenCalled();
    window.removeEventListener(events.INJECT_AD_SLOT, callback);
  });

  it(`Should create/dispatch ${events.REFRESH_AD_SLOT} custom event and push callback inside array`, () => {
    // Given
    const callback = jest.fn();
    const getGooglePublisherTagInstanceMock = createGetGooglePublisherTagInstanceMock({
      apiReady: false,
    });

    // When
    window.addEventListener(events.REFRESH_AD_SLOT, callback);
    createEvent(getGooglePublisherTagInstanceMock, events.REFRESH_AD_SLOT);
    jest.runAllTimers();

    // Expect
    expect(callback).not.toHaveBeenCalled();
    expect(getGooglePublisherTagInstanceMock.cmd).toHaveLength(1);
    window.removeEventListener(events.REFRESH_AD_SLOT, callback);
  });

  it(`Should not create any event`, () => {
    // Given
    const callback = jest.fn();
    const getGooglePublisherTagInstanceMock = createGetGooglePublisherTagInstanceMock();

    // When
    window.addEventListener('foo', callback);
    createEvent(getGooglePublisherTagInstanceMock, 'foo');
    jest.runAllTimers();

    // Expect
    expect(callback).not.toHaveBeenCalled();
    window.removeEventListener('foo', callback);
  });
});
