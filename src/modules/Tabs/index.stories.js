import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'react-emotion';
import { object, text } from '@storybook/addon-knobs';
import { Tabs } from '../..';
import { coreLightMinus1 } from '../../colors';
import * as icons from './icon-type';

const tabs = storiesOf('Modules|Tabs', module);

const tabsData = [
  {
    label: 'Live Commentary',
    icon: icons.LIVE_COMMENTS,
    key: 'keytab4',
  },
  {
    label: 'Match',
    icon: icons.MATCH,
    key: 'keytab1',
  },
  {
    label: 'All Matches',
    icon: icons.ALL_MATCHES,
    key: 'keytab2',
  },
  {
    label: 'User Comments',
    icon: icons.USER_COMMENTS,
    key: 'keytab3',
  },
];

const Wrapper = styled.div`
  color: ${coreLightMinus1};
`;

tabs.add('tabs', () => (
  <Wrapper>
    <Tabs
      defaultTab={text('defaultTab', 'keytab1')}
      /* eslint-disable-next-line no-alert */
      onItemSelected={key => alert(`You clicked the tab : ${key}`)}
      tabs={object('tabs', tabsData)}
    />
  </Wrapper>
));
