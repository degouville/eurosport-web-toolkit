import React from 'react';
import { shallow, render } from 'enzyme';
import SocialIcon, { StyledSnapchat, StyledInstagram, StyledTwitter, StyledFacebook } from '.';

describe('SocialIcon', () => {
  describe('render of social icons from iconType prop', () => {
    it('twitter', () => {
      const wrapper = shallow(<SocialIcon iconType="twitter" />);
      expect(wrapper.find(StyledTwitter)).toHaveLength(1);
    });

    it('facebook', () => {
      const wrapper = shallow(<SocialIcon iconType="facebook" />);
      expect(wrapper.find(StyledFacebook)).toHaveLength(1);
    });

    it('snapchat', () => {
      const wrapper = shallow(<SocialIcon iconType="snapchat" />);
      expect(wrapper.find(StyledSnapchat)).toHaveLength(1);
    });

    it('instagram', () => {
      const wrapper = shallow(<SocialIcon iconType="instagram" />);
      expect(wrapper.find(StyledInstagram)).toHaveLength(1);
    });
  });

  describe('renders text from iconText prop', () => {
    it('when iconText provided', () => {
      const wrapper = render(<SocialIcon iconType="instagram" iconText="my instagram text description" />);
      expect(wrapper.text()).toEqual('my instagram text description');
    });

    it('when iconText is not provided', () => {
      const wrapper = render(<SocialIcon iconType="instagram" />);
      expect(wrapper.text()).toBe('');
    });
  });
});
