import React from 'react';
import { shallow } from 'enzyme/build';
import SharedLink from './SharedLink';
import Cards from '../../components/Card';

const props = {
  sharedlink: {
    title: 'title',
    url: 'url',
    link: {
      type: 2,
    },
    pictureurl: 'picurl',
  },
  labelPlayButton: 'play this video',
};

describe('SharedLink', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SharedLink {...props} />);
  });

  it('matches video card snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('displays story card if sharedlink.link type is not 2', () => {
    wrapper.setProps({
      ...props,
      sharedlink: {
        ...props.sharedlink,
        link: {
          type: 75,
        },
      },
    });

    expect(wrapper.find(Cards.CardSmall).prop('labelPlayButton')).toBe('');
  });

  it('not fails when sharedlink structure is broken', () => {
    wrapper.setProps({
      sharedlink: {},
    });

    expect(wrapper.find(Cards.CardSmall).props()).toEqual({
      description: '',
      image: '',
      labelPlayButton: '',
      link: '',
      title: '',
      topic: '',
      target: '_blank',
      darkness: 0,
    });
  });
});
