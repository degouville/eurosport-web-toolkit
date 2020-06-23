import React from 'react';
import { shallow } from 'enzyme';
import { StyledLi } from 'src/components/Dropdown';
import LanguageSelector from './index';
import audioTracksMock from './mocks/audio-tracks.json';

describe('LanguageSelector', () => {
  const createDefaultProps = newProps => ({
    audioTracks: [...audioTracksMock],
    onAudioTrackChange: () => {},
    ...newProps,
  });

  describe('Snapshots', () => {
    it('Should match snapshot', () => {
      // Given
      const props = createDefaultProps();
      const wrapper = shallow(<LanguageSelector {...props} />);

      // Expect
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Should display all 3 languages', () => {
    // Given
    const props = createDefaultProps();
    const wrapper = shallow(<LanguageSelector {...props} />).dive();
    const languages = wrapper.dive().find(StyledLi);

    // Expect
    expect(languages).toHaveLength(3);
  });

  it('Should change selected language to bulgarian language', () => {
    // Given
    const props = createDefaultProps({
      onAudioTrackChange: jest.fn(),
    });
    const wrapper = shallow(<LanguageSelector {...props} />).dive();
    const languages = wrapper.dive().find(StyledLi);
    const bulgarianLanguage = languages.at(2);

    // When
    bulgarianLanguage.simulate('click');

    // Expect
    expect(props.onAudioTrackChange).toHaveBeenCalledWith(2);
  });
});
