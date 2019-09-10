import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Login from './index';

const createDefaultProps = () => ({
  onSubmit: action('onSubmit'),
  title: text('title', 'Sign in to your Eurosport Player account'),
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
  showSubscribeSection: boolean('showSubscribeSection', true),
  isSecondaryMode: boolean('isSecondaryMode', false),
  recaptchaSiteKey: text('recaptchaSiteKey', '6LeHaK0UAAAAAF5SxiYjhFNMDpTKy4B8Mc_kWgiM'),
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
