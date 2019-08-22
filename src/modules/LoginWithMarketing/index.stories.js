import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import LoginWithMarketing from '.';

const createDefaultProps = () => ({
  onSubmit: action('onSubmit'),
  title: text('title', 'Sign in to your Eurosport Player account'),
  forgotPasswordText: text('forgotPasswordText', 'Forgot password?'),
  forgotPasswordUrl: text('forgotPasswordUrl', 'https://eurosport.fr'),
  subscribeUrl: text('subscribeUrl', 'https://www.eurosportplayer.com/'),
  subscribeText: text('subscribeText', 'Subscribe'),
  needHelpText: text('needHelpText', 'Need help?'),
  needHelpUrl: text('needHelpUrl', 'https://eurosport.fr'),
  callToActionText: text('callToActionText', 'New to Eurosport Player?'),
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
});

storiesOf('Modules|LoginWithMarketing', module).add('LoginWithMarketing', () => (
  <LoginWithMarketing {...createDefaultProps()} />
));
