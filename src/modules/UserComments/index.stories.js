/* eslint-disable no-underscore-dangle */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, number, object, text } from '@storybook/addon-knobs';
import { UserComments, AdInit, AdManager, AdPlacement } from '../..';
import activatedCommentsConfig from './mockData/activatedComments.json';
import deactivatedCommentsConfig from './mockData/deactivatedComments.json';

const userCommentsStories = storiesOf('Modules|UserComments', module);

const loginCallback = () => {
  const win = window.open('https://www.eurosport.fr/login.shtml', '_blank');
  win.focus();
};

const logoutCallback = () => {};

userCommentsStories.add('ActivatedUserComments', () => (
  <>
    <UserComments
      userToken={text('userToken', '')}
      loginCallback={loginCallback}
      logoutCallback={logoutCallback}
      livefyreConfig={object('livefyreConfig', activatedCommentsConfig)}
      nbCommentsText={text('nbCommentsText', 'Comments')}
      deactivatedText={text('deactivatedText', 'Comments are deactivated for this publication')}
      fullWidth={boolean('fullWidth', false)}
    />
  </>
));

userCommentsStories.add('DeactivatedUserComments', () => (
  <>
    <UserComments
      userToken={text('userToken', '')}
      loginCallback={loginCallback}
      logoutCallback={logoutCallback}
      livefyreConfig={object('livefyreConfig', deactivatedCommentsConfig)}
      nbCommentsText={text('nbCommentsText', 'Comments')}
      deactivatedText={text('deactivatedText', 'Comments are deactivated for this publication')}
      fullWidth={boolean('fullWidth', false)}
    />
  </>
));

userCommentsStories.add('ActivatedUserCommentsWithAds', () => (
  <>
    <AdInit
      domain="fr"
      pageType={select('pageType', Object.values(AdManager.enums.pageTypes), AdManager.enums.pageTypes.LIVE)}
      personalizeAds={boolean('personalizeAds', false)}
      advertisementSlotId={number('advertisementSlotId', 21725585473)}
      slotsConfig={object('slotsConfig', AdManager.defaultSlotsConfig)}
      keyValues={object('keyValues', { sport: 57 })}
    />

    <UserComments
      userToken={text('userToken', '')}
      loginCallback={loginCallback}
      logoutCallback={logoutCallback}
      livefyreConfig={object('livefyreConfig', activatedCommentsConfig)}
      topAdElement={<AdPlacement adType={AdManager.enums.adTypes.BANNER_SPONSORSHIP} />}
      rightAdElement={<AdPlacement adType={AdManager.enums.adTypes.MPU} isNoMobile isNoTablet />}
      nbCommentsText={text('nbCommentsText', 'Comments')}
      deactivatedText={text('deactivatedText', 'Comments are deactivated for this publication')}
      fullWidth={boolean('fullWidth', false)}
    />
  </>
));
