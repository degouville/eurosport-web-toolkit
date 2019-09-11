import React from 'react';
import { shallow } from 'enzyme';
import withVideoAnalytics from './withVideoAnalytics';

class VideoAnalyticsMock {
  onReady = jest.fn();

  onAdBreakStart = jest.fn();

  onAdBreakComplete = jest.fn();

  onLoginReady = jest.fn();

  onAdStart = jest.fn();

  onAdTime = jest.fn();

  onAdComplete = jest.fn();

  onPlay = jest.fn();

  onPause = jest.fn();
}

describe('hocs/withVideoAnalytics', () => {
  const defaultProps = {};
  let analytics;

  beforeEach(() => {
    analytics = new VideoAnalyticsMock();
  });

  describe('props injection', () => {
    it('Should call analytics events', () => {
      // Given
      const props = {
        ...defaultProps,
        analytics,
      };
      const Component = withVideoAnalytics(React.Component);

      // Then
      const wrapper = shallow(<Component {...props} />);
      wrapper.props().onReady();

      // Expect
      expect(analytics.onReady).toHaveBeenCalledTimes(1);
    });

    it('Should call analytics events and forward function parameters', () => {
      // Given
      const props = {
        ...defaultProps,
        analytics,
      };
      const Component = withVideoAnalytics(React.Component);

      // Then
      const wrapper = shallow(<Component {...props} />);
      wrapper.props().onReady(42, 0);

      // Expect
      expect(analytics.onReady).toHaveBeenNthCalledWith(1, 42, 0);
    });

    it('Should call base prop', () => {
      // Given
      const onReady = jest.fn();
      const onAdBreakStart = jest.fn();
      const props = {
        ...defaultProps,
        onReady,
        onAdBreakStart,
        analytics,
      };
      const Component = withVideoAnalytics(React.Component);

      // Then
      const wrapper = shallow(<Component {...props} />);
      wrapper.props().onReady();
      wrapper.props().onAdBreakStart();

      // Expect
      expect(onReady).toHaveBeenCalledTimes(1);
      expect(onAdBreakStart).toHaveBeenCalledTimes(1);
    });
  });
});
