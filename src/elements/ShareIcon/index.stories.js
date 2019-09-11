import React from 'react';
import styled from 'react-emotion';
import { storiesOf } from '@storybook/react';
import { number, radios } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ShareIcon from './index';

const ShareIconStories = storiesOf('Elements|ShareIcon', module);

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 320px;
`;

const options = {
  facebook: 'facebook',
  twitter: 'twitter',
  whatsapp: 'whatsapp',
};

ShareIconStories.add('All', () => (
  <Wrapper>
    <ShareIcon icon="facebook" size={100} onClick={action('facebook')} />
    <ShareIcon icon="twitter" size={100} onClick={action('twitter')} />
    <ShareIcon icon="whatsapp" size={100} onClick={action('whatsapp')} />
  </Wrapper>
));

ShareIconStories.add('facebook', () => <ShareIcon icon="facebook" size={100} onClick={action('facebook')} />);

ShareIconStories.add('twitter', () => <ShareIcon icon="twitter" size={100} onClick={action('twitter')} />);

ShareIconStories.add('whatsapp', () => <ShareIcon icon="whatsapp" size={100} onClick={action('whatsapp')} />);

ShareIconStories.add('custom - size', () => (
  <ShareIcon size={number('size', '300')} icon={radios('Icon', options, 'facebook')} onClick={action('share')} />
));
