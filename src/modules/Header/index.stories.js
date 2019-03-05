/* eslint-disable no-underscore-dangle */
import React from 'react';
import { withInfo } from '@storybook/addon-info';
import { text, object } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Header } from '../..';

import headerMenu from '../BurgerMenu/mocks/header';

storiesOf('Header', module)
  .add('default', withInfo()(() => <Header />))
  .add(
    'configurable',
    withInfo()(() => {
      window.__cmp = {};
      return (
        <Header
          homePageUrl={text('homePageUrl', 'https://www.eurosport.com')}
          quantCastMenuLabel={text('quantCastMenuLabel', 'privacy settings')}
          menuItems={object('menuItems', headerMenu)}
        />
      );
    })
  );
