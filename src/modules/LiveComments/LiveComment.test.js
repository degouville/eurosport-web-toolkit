import React from 'react';
import { shallow } from 'enzyme/build';
import SharedLink from './SharedLink';
import LiveComment, { StyledMarker, StyledPlainHtml, StyledTwitterCard } from './LiveComment';

describe('LiveComment', () => {
  const liveComment = {
    html: '<b>comment html text</b>',
    marker: 'comment marker text',
    tweet: {
      url: 'tweetUrl',
    },
    picture: {
      format: {
        url: 'picture.format.url',
      },
    },
    sharedlink: {
      title: 'shared link title',
      image: 'shared.link.image',
      link: {
        type: 2,
      },
    },
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LiveComment liveComment={liveComment} labelPlayButton="play button" />);
  });

  it('matches snapshot with all valid props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('render cases', () => {
    it('null if html, marker, pictureurl and tweet are missing', () => {
      wrapper.setProps({
        liveComment: {},
      });

      expect(wrapper.html()).toBe(null);
    });

    it('skips marker if one is missing', () => {
      wrapper.setProps({
        liveComment: {
          ...liveComment,
          marker: null,
        },
      });
      expect(wrapper.find(StyledMarker)).toHaveLength(0);
    });

    it('skips html if one is missing', () => {
      wrapper.setProps({
        liveComment: {
          ...liveComment,
          html: null,
        },
      });
      expect(wrapper.find(StyledPlainHtml)).toHaveLength(0);
    });

    it('skips picture if one is missing', () => {
      wrapper.setProps({
        liveComment: {
          ...liveComment,
          picture: {
            format: {},
          },
        },
      });
      expect(wrapper.find('img')).toHaveLength(0);
    });

    it('skips tweet if one is missing', () => {
      wrapper.setProps({
        liveComment: {
          ...liveComment,
          tweet: null,
        },
      });
      expect(wrapper.find(StyledTwitterCard)).toHaveLength(0);
    });

    it('skips sharedlink if one is missing', () => {
      wrapper.setProps({
        liveComment: {
          ...liveComment,
          sharedlink: null,
        },
      });
      expect(wrapper.find(SharedLink)).toHaveLength(0);
    });
  });
});
