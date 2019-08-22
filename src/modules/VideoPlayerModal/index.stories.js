import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Login from 'src/modules/Login';
import VideoPlayerModal from './index';
import LoginWithMarketing from '../LoginWithMarketing';

const createDefaultProps = newProps => ({
  onSubmit: action('onSubmit'),
  title: text('title', 'Sign in to your Eurosport Player account'),
  forgotPasswordText: text('forgotPasswordText', 'Forgot password?'),
  forgotPasswordUrl: text('forgotPasswordUrl', 'https://eurosport.fr'),
  subscribeUrl: text('subscribeUrl', 'https://eurosport.fr'),
  subscribeText: text('subscribeText', 'Subscribe'),
  needHelpText: text('needHelpText', 'Need help?'),
  callToActionText: text('callToActionText', 'New to Eurosport Player?'),
  needHelpUrl: text('needHelpUrl', 'https://eurosport.fr'),
  passwordPlaceholder: text('passwordPlaceholder', 'Password'),
  emailPlaceholder: text('emailPlaceholder', 'Email'),
  signInText: text('signInText', 'Sign In'),
  showPasswordText: text('showPasswordText', 'Show'),
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

storiesOf('Modules|VideoPlayerModal', module)
  .add('with Login', () => (
    <VideoPlayerModal onClose={action('close-click')}>
      <Login {...createDefaultProps()} />
    </VideoPlayerModal>
  ))
  .add('with Video Player Login', () => (
    <VideoPlayerModal onClose={action('close-click')}>
      <LoginWithMarketing {...createDefaultProps()} />
    </VideoPlayerModal>
  ));
