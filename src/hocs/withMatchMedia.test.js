import React from 'react';
import { shallow, mount } from 'enzyme';
import withMatchMedia, { HideOnMobile } from './withMatchMedia';

describe('hocs/withMatchMedia', () => {
  const listenerFn = jest.fn();
  // eslint-disable-next-line
  const matchMediaSpy = (global.matchMedia = jest.fn());

  beforeEach(() => {
    matchMediaSpy.mockImplementation(() => ({
      matches: true,
      addListener: listenerFn,
    }));
  });

  afterEach(() => {
    listenerFn.mockClear();
  });

  describe('props injection', () => {
    it('injects the `breakpointMatched` prop by default', () => {
      const Component = withMatchMedia('')(React.Component);

      const wrapper = shallow(<Component />);
      expect(wrapper.props()).toEqual({ breakpointMatched: true });
    });

    it('injects the `custom` prop if provided', () => {
      const Component = withMatchMedia('', 'customPropertyName')(React.Component);

      const wrapper = shallow(<Component />);
      expect(wrapper.props()).toEqual({ customPropertyName: true });
    });
  });

  describe('media change events', () => {
    it('registers a onMediaChange listener for media change', () => {
      const Component = withMatchMedia('')(React.Component);
      const wrapper = shallow(<Component />);
      expect(listenerFn).toHaveBeenCalledWith(wrapper.instance().onMediaChange);
    });

    it('onMediaChange triggers state change', () => {
      const Component = withMatchMedia('')(React.Component);
      const wrapper = shallow(<Component />);
      wrapper.instance().onMediaChange({ matches: true });
      expect(wrapper.state()).toEqual({ matches: true });
      wrapper.instance().onMediaChange({ matches: false });
      expect(wrapper.state()).toEqual({ matches: false });
    });

    it('changes the prop if media match changes', () => {
      const Component = withMatchMedia('')(React.Component);
      const wrapper = shallow(<Component />);
      expect(wrapper.props()).toEqual({ breakpointMatched: true });

      wrapper.setState({ matches: false });
      expect(wrapper.props()).toEqual({ breakpointMatched: false });
    });
  });

  describe('HideOnMobile helper component', () => {
    it('should not render component(s) on mobile res', () => {
      const Component = () => <div>text </div>;
      const wrapper = (
        <HideOnMobile>
          <Component />
          <Component />
        </HideOnMobile>
      );
      expect(mount(wrapper).find('div').length).toEqual(2);

      matchMediaSpy.mockImplementation(media => ({
        matches: +media.replace(/\D/g, '') > 700,
        addListener: listenerFn,
      }));

      expect(mount(wrapper).text()).toEqual(null);
    });
  });
});
