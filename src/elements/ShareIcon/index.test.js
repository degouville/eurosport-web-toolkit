import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import theme from 'src/theme';
import { ThemeProvider } from 'emotion-theming';
import whatsapp from 'src/assets/social-icons/whatsapp.svg';
import ShareIcon, { SocialIcon } from './index';

const WrapperTheme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

describe('ShareIcon', () => {
  it('should render ShareIcon facebook', () => {
    const wrapper = mount(
      <WrapperTheme>
        <ShareIcon icon="facebook" size={30} />
      </WrapperTheme>
    ).find(ShareIcon);
    expect(wrapper).toMatchSnapshot();
  });

  it('should apply ShareIcon height passed in through props', () => {
    const wrapper = mount(
      <WrapperTheme>
        <ShareIcon icon="twitter" size={100} />
      </WrapperTheme>
    ).find(ShareIcon);
    expect(wrapper).toHaveStyleRule('height', '100px');
  });
  it('should import the right icon url', () => {
    const wrapper = mount(
      <WrapperTheme>
        <ShareIcon icon="whatsapp" size={100} />
      </WrapperTheme>
    ).find(SocialIcon);
    expect(wrapper).toHaveStyleRule('background-image', `url(${whatsapp})`);
  });
});

WrapperTheme.propTypes = {
  children: PropTypes.node.isRequired,
};
