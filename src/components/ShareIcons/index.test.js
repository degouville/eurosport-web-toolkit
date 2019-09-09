import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import * as DeviceInfo from 'react-device-detect';
import theme from 'src/theme';
import { ThemeProvider } from 'emotion-theming';
import ShareIcon from 'src/elements/ShareIcon';
import ShareIcons from './index';

const WrapperTheme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

jest.mock('react-device-detect');

describe('ShareIcons', () => {
  beforeEach(() => {
    DeviceInfo.isMobile = true;
  });
  it('renders ShareIcons', () => {
    const Wrapper = shallow(
      <ShareIcons size={50} label="SHARE" whatsappCTA={() => {}} facebookCTA={() => {}} twitterCTA={() => {}} />
    );
    expect(Wrapper).toMatchSnapshot();
  });

  it('should render 3 shareIcon in mobile view', () => {
    const Wrapper = mount(
      <WrapperTheme>
        <ShareIcons size={50} label="SHARE" whatsappCTA={() => {}} facebookCTA={() => {}} twitterCTA={() => {}} />
      </WrapperTheme>
    );
    expect(Wrapper.find(ShareIcon)).toHaveLength(3);
  });
  it(`should not render shareIcon if CTA callbacks don't provided`, () => {
    const Wrapper = mount(
      <WrapperTheme>
        <ShareIcons size={50} label="SHARE" />
      </WrapperTheme>
    );
    expect(Wrapper.find(ShareIcon)).toHaveLength(0);
  });
  it(`should render 2 shareIcon in desktop view`, () => {
    DeviceInfo.isMobile = false;
    const Wrapper = mount(
      <WrapperTheme>
        <ShareIcons size={50} label="SHARE" whatsappCTA={() => {}} facebookCTA={() => {}} twitterCTA={() => {}} />
      </WrapperTheme>
    );
    expect(Wrapper.find(ShareIcon)).toHaveLength(2);
  });
});

WrapperTheme.propTypes = {
  children: PropTypes.node.isRequired,
};
