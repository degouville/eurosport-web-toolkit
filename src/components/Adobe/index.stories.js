import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Adobe } from '../..';

const indexStories = storiesOf('Components|Adobe', module);

indexStories.add('Adobe', () => <Adobe src={text('src', 'url.toscript.js')} isServerSide={false} />);
