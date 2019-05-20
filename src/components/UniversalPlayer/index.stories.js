import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import UniversalPlayer from './index';

const getBaseProps = () => ({
  jwpScript: text('ScriptUrl', 'https://cdn.jwplayer.com/libraries/UIUoOMFG.js'),
  entityId: text('EntityID', 'E1FR'),
  streamType: text('StreamType', 'VIDEO'),
  source: text('Source', 'VDP'),
});

const stories = storiesOf('Components|UniversalPlayer', module);

stories.add('default', () => <UniversalPlayer {...getBaseProps()} />);
