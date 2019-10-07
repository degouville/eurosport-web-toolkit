import React from 'react';
import { channel, createBroadcast } from 'emotion-theming';
import { mount } from 'enzyme';
import theme from 'src/theme';
import * as PropTypes from 'prop-types';
import LoginWithMarketing, { DefaultModal, MobileModal } from '.';
import * as breakpoints from '../../breakpoints';

describe('LoginWithMarketing', () => {
  const props = {
    onSubmit: jest.fn(),
    title: 'Sign In',
    forgotPasswordUrl: 'es.com/forgot',
    forgotPasswordText: 'Forgot password',
    subscribeUrl: 'es.com/subscribe',
    subscribeText: 'Subscribe',
    needHelpText: 'Need Help?',
    needHelpUrl: 'es.com/help',
    callToActionText: 'New to eurosport player?',
    passwordPlaceholder: 'Password',
    emailPlaceholder: 'Email',
    signInText: 'SignIn',
    showPasswordText: 'Show',
    errorMessage: '',
    marketingMessages: {
      title: 'Subscribe to watch now',
      subtitle: 'This content requires a Eurosport Player subscription. Subscribe now or log in below.',
      checklist: [
        'Watch your favorite sports live and on demand',
        'Stream to your device at home and on the go',
        'Grand Slam tennis, Grand Tour cycling, motorsports and more',
      ],
    },
  };

  const mountOption = {
    theme,
    context: {
      [channel]: createBroadcast(theme),
    },
    childContextTypes: {
      // eslint-disable-next-line react/forbid-prop-types
      [channel]: PropTypes.object,
    },
  };

  const mockMatchMedia = currentQuery => query => ({
    media: query,
    onchange: null,
    addListener: () => null,
    removeListener: () => null,
    matches: query === currentQuery,
  });

  it('renders LoginWithMarketing as expected', () => {
    window.matchMedia = mockMatchMedia(`(min-width: ${breakpoints.points.medium}px)`);

    const wrapper = mount(<LoginWithMarketing {...props} />, mountOption);

    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders Desktop version', () => {
    window.matchMedia = mockMatchMedia(`(min-width: ${breakpoints.points.small}px)`);
    const wrapper = mount(<LoginWithMarketing {...props} />, mountOption);

    expect(wrapper.find(MobileModal).length).toBe(0);
    expect(wrapper.find(DefaultModal).length).toBe(1);
    wrapper.unmount();
  });

  it('renders Mobile version', () => {
    window.matchMedia = mockMatchMedia(`(max-width: ${breakpoints.points.small - 1}px)`);
    const wrapper = mount(<LoginWithMarketing {...props} />, mountOption);

    expect(wrapper.find(MobileModal).length).toBe(1);
    expect(wrapper.find(DefaultModal).length).toBe(0);
    wrapper.unmount();
  });
});
