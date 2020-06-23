import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, text } from '@storybook/addon-knobs';
import RoundTable from './RoundTable';
import RoundTableMobile from './RoundTableMobile';

import { matches, doubleMatches, rounds } from './mock/data';

const convertToTab = ({ disabled, highligthed, name: label }, index) => {
  const href = `${index + 1}`;
  return { label, href, disabled, highligthed };
};
const tabs = rounds.map(convertToTab);

const roundTableStories = storiesOf('Modules|RoundTable', module);

const renderRoundTable = () => (
  <RoundTable {...object('data', { matches, rounds })} offsetLeft={text('offsetLeft', '0px')} />
);
const renderDoubleRoundTable = () => (
  <RoundTable {...object('data', { matches: doubleMatches, rounds })} offsetLeft={text('offsetLeft', '0px')} />
);
const renderRoundTableMobile = () => (
  <RoundTableMobile tabs={object('Tabs', tabs)} matches={object('Matches', matches)} />
);
roundTableStories
  .add('RoundTable', renderRoundTable)
  .add('RoundTableMobile', renderRoundTableMobile)
  .add('DoubleRoundTable', renderDoubleRoundTable);
