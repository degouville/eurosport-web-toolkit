import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Components|Advertisement', module)
  .addParameters({
    backgrounds: { disable: true },
  })
  .add('AdManager', () => <div>Ad manager Module. info about usage keeps into readme next to its location</div>);
