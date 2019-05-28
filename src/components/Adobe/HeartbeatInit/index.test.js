import React from 'react';
import { shallow } from 'enzyme';
import HeartbeatInit from './index';

describe('HeartbeatInit', () => {
  let eventListeners;
  let callback;
  let wrapper;

  beforeEach(() => {
    eventListeners = {};

    window.addEventListener = jest.fn((eventName, callBack) => {
      eventListeners[eventName] = callBack;
    });

    window.removeEventListener = jest.fn(eventName => {
      eventListeners[eventName] = undefined;
    });

    callback = jest.fn();
  });

  const shallowHeartbeatInit = props => {
    wrapper = shallow(<HeartbeatInit {...props} />);
  };

  const triggerEventListener = eventName => eventListeners[eventName] && eventListeners[eventName]();

  it('Should call the event listener callback heartbeat-loaded when no eventLoadedName is provided', () => {
    // Given
    shallowHeartbeatInit({ callback });

    // Then
    triggerEventListener('heartbeat-loaded');

    // Expect
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Should call the event listener callback when the component is mount', () => {
    // Given
    shallowHeartbeatInit({ callback, eventLoadedName: 'myEvent' });

    // Then
    triggerEventListener('myEvent');

    // Expect
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Should not call the event listener callback when the component is unmount', () => {
    // Given
    shallowHeartbeatInit({ callback, eventLoadedName: 'myEvent' });

    // Then
    wrapper.unmount();
    triggerEventListener('myEvent');

    // Expect
    expect(callback).not.toHaveBeenCalled();
  });
});
