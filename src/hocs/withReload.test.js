import React from 'react';
import { mount } from 'enzyme/build';
import withReload from './withReload';
import { isOnViewPort, isTopMost } from './visibilityHelpers';

jest.mock('./visibilityHelpers');

jest.useFakeTimers();

const Component = React.forwardRef((props, ref) => <div ref={ref} id="id1234" />);
const ReloadedComponent = withReload(Component);
const ComponentEmptyClass = React.forwardRef((props, ref) => <div className="slot-empty" ref={ref} />);
const ReloadedComponentEmptyClass = withReload(ComponentEmptyClass);

describe('withReload HOC', () => {
  let mockFn;

  afterAll(() => {
    jest.clearAllTimers();
  });

  beforeEach(() => {
    isOnViewPort.mockImplementation(() => true);
    isTopMost.mockImplementation(() => true);
    mockFn = jest.fn();
  });

  it('should call given refresh fn each n seconds with correct parameter', () => {
    mount(<ReloadedComponent reloadInterval={5} refreshHandler={mockFn} />);
    jest.advanceTimersByTime(25);
    expect(mockFn).toHaveBeenCalledTimes(5);
    expect(mockFn).toHaveBeenCalledWith('id1234');
  });

  it('should not call refresh fn when element is not in view', () => {
    isOnViewPort.mockImplementation(() => false);

    mount(<ReloadedComponent reloadInterval={5} refreshHandler={mockFn} />);
    jest.advanceTimersByTime(5);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should not call refresh fn when element is hidden behind other element', () => {
    isTopMost.mockImplementation(() => false);

    mount(<ReloadedComponent reloadInterval={5} refreshHandler={mockFn} />);
    jest.advanceTimersByTime(5);
    expect(mockFn).not.toHaveBeenCalled();
  });
  it('should call refresh fn if element is in view and has "slot-empty" className', () => {
    isTopMost.mockImplementation(() => false);

    mount(<ReloadedComponentEmptyClass reloadInterval={5} refreshHandler={mockFn} />);
    jest.advanceTimersByTime(5);
    expect(mockFn).toHaveBeenCalled();
  });
});
