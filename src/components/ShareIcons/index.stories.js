import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ShareIcons from './index';

const shareIconsStories = storiesOf('Components|ShareIcons', module);

shareIconsStories.add('ShareIcons', () => (
  <ShareIcons
    size={number('size', 50)}
    label={text('label', 'SHARE')}
    whatsappCTA={action('whatsapp')}
    facebookCTA={action('facebook')}
    twitterCTA={action('twitter')}
  />
));
