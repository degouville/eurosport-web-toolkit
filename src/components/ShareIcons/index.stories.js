import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ShareIcons from './index';

const ShareIconsStories = storiesOf('Components|ShareIcons', module);

const icons = [
  { icon: 'facebook', size: 32, onClick: action('facebook') },
  { icon: 'twitter', size: 32, onClick: action('twitter') },
  { icon: 'whatsapp', size: 32, onClick: action('whatsapp') },
];

ShareIconsStories.add('ShareModule', () => (
  <ShareIcons labelIcon={boolean('Label Icon', true)} icons={icons} label={text('Share Label', 'share')} />
));
