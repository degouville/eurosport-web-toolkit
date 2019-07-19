import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Login from './index';

const createDefaultProps = () => ({
  onSubmit: () => null,
  title: 'Sign in',
  forgotPasswordText: text('forgotPasswordText', 'Forgot password?'),
  forgotPasswordUrl: text('forgotPasswordUrl', 'https://eurosport.fr'),
  subscribeText: text('subscribeText', 'Subscribe'),
  subscribeUrl: text('subscribeUrl', 'https://eurosport.fr'),
  needHelpText: text('needHelpText', 'Need help?'),
  needHelpUrl: text('needHelpUrl', 'https://eurosport.fr'),
  callToActionText: text('callToActionText', 'New to Eurosport Player?'),
  passwordPlaceholder: text('passwordPlaceholder', 'Password'),
  emailPlaceholder: text('emailPlaceholder', 'Email'),
  signInText: text('signInText', 'Sign In'),
  showPasswordText: text('showPasswordText', 'Show'),
});

const createPropsWithErrorMessage = () => ({
  ...createDefaultProps(),
  errorMessage: text('errorMessage', 'Impossible to connect to your account'),
});

storiesOf('Modules|Login', module)
  .add('Desktop without error', () => (
    <div style={{ width: '417px' }}>
      <Login {...createDefaultProps()} />
    </div>
  ))
  .add('Desktop with error', () => (
    <div style={{ width: '417px' }}>
      <Login {...createPropsWithErrorMessage()} />
    </div>
  ))
  .add('Mobile without error', () => <Login {...createDefaultProps()} />)
  .add('Mobile with error', () => <Login {...createPropsWithErrorMessage()} />);
