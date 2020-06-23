import React from 'react';
import { shallow } from 'enzyme';
import FullScreen from './index';

describe('Components|JWPlayerETP|Controls|FullScreen', () => {
  const createDefaultProps = newProps => ({
    isFullscreen: true,
    onFullscreenChange: jest.fn(),
    ...newProps,
  });

  it('Should match snapshot', () => {
    // Given
    const props = createDefaultProps();
    const wrapper = shallow(<FullScreen {...props} />);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  describe('Clicks', () => {
    it('Should call onFullscreenChange on click', () => {
      // Given
      const props = createDefaultProps({ isFullscreen: true });
      const wrapper = shallow(<FullScreen {...props} />);

      // When
      wrapper.find('[alt="minimise"]').simulate('click');

      // Expect
      expect(props.onFullscreenChange).toHaveBeenCalled();
    });

    it('Should have minimise when isFullscreen is true', () => {
      // Given
      const props = createDefaultProps({ isFullscreen: true });
      const wrapper = shallow(<FullScreen {...props} />);

      // When
      const exist = wrapper.find('[alt="minimise"]').exists();

      // Expect
      expect(exist).toBeTruthy();
    });

    it('Should have maximise when isFullscreen is false', () => {
      // Given
      const props = createDefaultProps({ isFullscreen: false });
      const wrapper = shallow(<FullScreen {...props} />);

      // When
      const exist = wrapper.find('[alt="maximise"]').exists();

      // Expect
      expect(exist).toBeTruthy();
    });
  });
});
