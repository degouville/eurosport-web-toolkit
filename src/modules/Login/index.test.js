import React from 'react';
import { shallow } from 'enzyme';
import Login, { CallToActionContainer } from './index';
import ErrorBanner from '../../elements/ErrorBanner';
import Input from '../../components/Input/input.component';

describe('Login', () => {
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
    errorMessage: undefined,
    ...newProps,
  });

  describe('Snapshot testing', () => {
    it('renders Login without ErrorBanner', () => {
      // Given
      const props = createProps({ errorMessage: undefined });
      const wrapper = shallow(<Login {...props} />);

      // Expect
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('renders Login with ErrorBanner', () => {
    // Given
    const props = createProps({ errorMessage: 'Impossible to connect' });
    const wrapper = shallow(<Login {...props} />);

    // Expect
    expect(wrapper.find(ErrorBanner)).toHaveLength(1);
  });

  it('renders Login without subscription section', () => {
    // Given
    const props = createProps({ showSubscribeSection: false });
    const wrapper = shallow(<Login {...props} />);

    // Expect
    expect(wrapper.find(CallToActionContainer)).toHaveLength(0);
  });

  describe('Behaviour testing', () => {
    const getEmailInput = wrp => wrp.find(Input).find({ placeholder: 'Email' });
    const getPasswordInput = wrp => wrp.find(Input).find({ type: 'password' });

    it('Should not display ErrorBanner when it is not defined', () => {
      // Given
      const props = createProps({ errorMessage: undefined });
      const wrapper = shallow(<Login {...props} />);

      // When
      const elements = wrapper.find(ErrorBanner);

      // Expect
      expect(elements.length).toBe(0);
    });

    it('Should display ErrorBanner when it is defined', () => {
      // Given
      const props = createProps({ errorMessage: 'Impossible to connect' });
      const wrapper = shallow(<Login {...props} />);

      // When
      const elements = wrapper.find(ErrorBanner);

      // Expect
      expect(elements.length).toBe(1);
    });

    it('Should update mail value when user write his email', () => {
      // Given
      const props = createProps();
      const wrapper = shallow(<Login {...props} />);

      // When
      const onEmailChange = getEmailInput(wrapper).prop('onChange');
      onEmailChange({ target: { value: 'myEmail' } });

      wrapper.rerender();
      const email = getEmailInput(wrapper).prop('value');

      // Expect
      expect(email).toBe('myEmail');
    });

    it('Should update password value when user write his password', () => {
      // Given
      const props = createProps();
      const wrapper = shallow(<Login {...props} />);

      // When
      const onPasswordChange = getPasswordInput(wrapper).prop('onChange');
      onPasswordChange({ target: { value: 'secret' } });

      wrapper.rerender();
      const password = getPasswordInput(wrapper).prop('value');

      // Expect
      expect(password).toBe('secret');
    });
  });
});
