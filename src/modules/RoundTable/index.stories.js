import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import RoundTable from './RoundTable';
import RoundTableMobile from './RoundTableMobile';

import { matches, doubleMatches, rounds } from './mock/data';

const convertToTab = ({ number, disabled, highligthed, name: label }) => {
  const href = `${number}`;
  return { label, href, disabled, highligthed };
};
const tabs = rounds.map(convertToTab);

const roundTableStories = storiesOf('Modules|RoundTable', module);

const renderRoundTable = () => <RoundTable {...object('data', { matches, rounds })} />;
const renderDoubleRoundTable = () => <RoundTable {...object('data', { matches: doubleMatches, rounds })} />;
const renderRoundTableMobile = () => (
  <RoundTableMobile tabs={object('Tabs', tabs)} matches={object('Matches', matches)} />
);
roundTableStories
  .add('RoundTable', renderRoundTable)
  .add('RoundTableMobile', renderRoundTableMobile)
  .add('DoubleRoundTable', renderDoubleRoundTable);
