import React from 'react';
import { shallow } from 'enzyme';
import Twitter, { getTweetIdFromUrl } from './Twitter';

describe('getTweetIdFromUrl', () => {
  it('returns id if valid url', () => {
    expect(getTweetIdFromUrl('tweet.com/id/777')).toBe('777');
    expect(getTweetIdFromUrl('tweet.com/id888/777')).toBe('777');
    expect(getTweetIdFromUrl('tweet.com/888/777')).toBe('777');
  });

  it('returns null if invalid url', () => {
    expect(getTweetIdFromUrl('')).toBe(null);
    expect(getTweetIdFromUrl('777/id')).toBe(null);
  });
});

describe('Twitter', () => {
  let wrapper;
  let spyReady;
  let spyCreateTweet;

  beforeEach(() => {
    global.window.twttr = {
      ready: jest.fn(),
      widgets: {
        createTweet: jest.fn(),
      },
    };

    wrapper = shallow(<Twitter tweetUrl="some.url/123456" />);
    spyReady = jest.spyOn(global.window.twttr, 'ready');
    spyCreateTweet = jest.spyOn(global.window.twttr.widgets, 'createTweet');
  });

  afterEach(() => {
    delete global.window.twttr;
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('tweet embeds', () => {
    it('loads tweets on init', () => {
      wrapper.instance().tweetRef.current = 'ref';
      expect(wrapper.state().initialised).toBe(false);
      expect(spyReady).toHaveBeenCalledWith(wrapper.instance().setInitialised);
      wrapper.instance().setInitialised();
      expect(wrapper.state().initialised).toBe(true);

      expect(spyCreateTweet).toHaveBeenCalledWith('123456', 'ref');
    });

    it('does not load tweet if invalid urls', () => {
      wrapper.setProps({
        tweetUrl: 'invalid.com',
      });
      wrapper.instance().setInitialised();
      expect(spyReady).toHaveBeenCalledWith(wrapper.instance().setInitialised);
      expect(spyCreateTweet).not.toHaveBeenCalled();
    });
  });
});
