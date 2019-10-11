import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { DataLayer } from '../..';
import dataLayerMock from './mocks/dataLayer.mock';

const datalayerStories = storiesOf('Components|DataLayer', module);

datalayerStories.add('configurable', () => (
  <DataLayer dataLayer={object('dataLayer', dataLayerMock.dataLayer, 'dataLayer prop example')} />
));
