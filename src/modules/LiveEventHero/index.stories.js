import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { LiveEventHero } from '../..';

const LiveEventHeroStories = storiesOf('Modules|LiveEventHero', module);
LiveEventHeroStories.add('Live Event Hero', () => (
  <LiveEventHero title={text('title', 'ROLAND GARROS')} subtitle={text('subtitle', '3RD ROUND')} />
));
