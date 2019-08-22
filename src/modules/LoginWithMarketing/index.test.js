import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { mount } from 'enzyme';
import theme from 'src/theme';
import LoginWithMarketing, { MobileModal, SignInButton } from '.';
import Login from '../Login';

describe('LoginWithMarketing', () => {
  const createProps = newProps => ({
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
    ...newProps,
  });

  it('renders LoginWithMarketing as expected', () => {
    const props = createProps();
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <LoginWithMarketing {...props} />
      </ThemeProvider>
    );
    // Expect
    expect(wrapper.find(LoginWithMarketing)).toMatchSnapshot();
    wrapper.unmount();
  });
  it('should display Login component on Login screen (Mobile only)', () => {
    const props = createProps();
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <MobileModal {...props} />
      </ThemeProvider>
    );
    expect(wrapper.find(Login)).toHaveLength(0);
    wrapper.find(SignInButton).simulate('click');
    expect(wrapper.find(Login)).toHaveLength(1);
    wrapper.unmount();
  });
});
