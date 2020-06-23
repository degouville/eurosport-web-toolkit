import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import UnderlineLink from './index';

const underlineLink = storiesOf('Elements|UnderlineLink', module);

underlineLink.add('default', () => (
  <UnderlineLink href={text('href', 'https://eurosport.fr')}>{text('text', 'NEED HELP?')}</UnderlineLink>
));
