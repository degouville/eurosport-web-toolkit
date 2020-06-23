import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { SeoText } from '../..';

const seoTextStories = storiesOf('Components|SeoText', module);

seoTextStories.add('Seo text', () => (
  <SeoText
    title={text('title', 'SeoText title')}
    subtitle={text('subtitle', 'SeoText subtitle')}
    content={text(
      'content',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis nisi sed massa laoreet, et aliquam metus faucibus. Integer sagittis lacinia dapibus. Praesent eros ante, rhoncus id lorem non, dignissim interdum nisl. In hac habitasse platea dictumst. Vivamus id efficitur erat, sed efficitur dui. Sed nisl tellus, cursus nec massa a, vulputate porta tortor. Mauris ullamcorper eros id dolor pharetra placerat. Nunc congue in nulla ut porttitor.'
    )}
  />
));
