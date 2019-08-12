import React from 'react';
import { shallow } from 'enzyme';
import PlayerButtons, { SpinnerStyled } from './index';

describe('Components|JWPlayerETP|Controls|PlayerButtons', () => {
  const createDefaultProps = newProps => ({
    isPlaying: true,
    onForward: jest.fn(),
    onRewind: jest.fn(),
    onPlay: jest.fn(),
    onPause: jest.fn(),
    isBuffering: false,
    ...newProps,
  });

  it('Should match snapshot when isPlaying is true', () => {
    // Given
    const props = createDefaultProps({ isPlaying: true });
    const wrapper = shallow(<PlayerButtons {...props} />);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('Should match snapshot when isPlaying is false', () => {
    // Given
    const props = createDefaultProps({ isPlaying: false });
    const wrapper = shallow(<PlayerButtons {...props} />);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  describe('Clicks', () => {
    it('Should call onForward on click', () => {
      // Given
      const props = createDefaultProps();
      const wrapper = shallow(<PlayerButtons {...props} />);

      // When
      wrapper.find('[alt="Forward"]').simulate('click');

      // Expect
      expect(props.onForward).toHaveBeenCalled();
    });

    it('Should call onRewind on click', () => {
      // Given
      const props = createDefaultProps();
      const wrapper = shallow(<PlayerButtons {...props} />);

      // When
      wrapper.find('[alt="Rewind"]').simulate('click');

      // Expect
      expect(props.onRewind).toHaveBeenCalled();
    });

    it('Should call onPause on click', () => {
      // Given
      const props = createDefaultProps({ isPlaying: true });
      const wrapper = shallow(<PlayerButtons {...props} />);

      // When
      wrapper.find('[alt="Pause"]').simulate('click');

      // Expect
      expect(props.onPause).toHaveBeenCalled();
    });

    it('Should call onPlay on click', () => {
      // Given
      const props = createDefaultProps({ isPlaying: false });
      const wrapper = shallow(<PlayerButtons {...props} />);

      // When
      wrapper.find('[alt="Play"]').simulate('click');

      // Expect
      expect(props.onPlay).toHaveBeenCalled();
    });
  });

  it('Should contains the spinner when isBuffering is true', () => {
    // Given
    const props = createDefaultProps({ isBuffering: true });
    const wrapper = shallow(<PlayerButtons {...props} />);

    // When
    const result = wrapper.find(SpinnerStyled).exists();

    // Expect
    expect(result).toBe(true);
  });
});
