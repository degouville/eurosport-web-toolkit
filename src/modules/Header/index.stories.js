/* eslint-disable no-underscore-dangle */
import React from 'react';
import { text, object } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Header } from '../..';

import menu from '../BurgerMenu/mocks/feed-menu';

const cta = { link: 'www.eurosport.fr', label: 'subscribe' };
const breadcrumbs = [
  { name: 'Tennis', url: 'http://eurosport.fr/tennis/' },
  { name: 'French Open', url: 'http://eurosport.fr/tennis/open-d-australie/' },
];

storiesOf('Modules|Header', module)
  .add('default', () => <Header />)
  .add('configurable', () => {
    window.__cmp = {};
    return (
      <Header
        homePageUrl={text('homePageUrl', 'https://www.eurosport.com')}
        menuItems={object('menuItems', menu.header)}
        breadcrumbs={object('breadcrumbs', breadcrumbs)}
      />
    );
  })
  .add('with CTA', () => {
    window.__cmp = {};
    return (
      <Header
        homePageUrl={text('homePageUrl', 'https://www.eurosport.com')}
        cta={object('cta', cta)}
        menuItems={object('menuItems', menu.header)}
        breadcrumbs={object('breadcrumbs', breadcrumbs)}
      />
    );
  });
