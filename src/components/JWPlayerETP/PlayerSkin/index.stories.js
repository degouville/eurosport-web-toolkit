import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import styled from 'react-emotion';
import ETPlayer from '../index';
import PlayerWrapper from './index';

const events = actions(
  'onPlayerInstantiation',
  'onReady',
  'onPlay',
  'onPause',
  'onAdBreakStart',
  'onAdBreakComplete',
  'onAdStart',
  'onAdTime',
  'onError',
  'onLoginModalReady',
  'onLoginModalDone'
);

const stories = storiesOf('Components|PlayerWrapper', module);

// TODO: It's a simple demo of the transition when we need to show player UI it will be refactored in the next tickets

const Visible = styled.css`
  visibility: visible;
  transform: translateY(0%);
  transition: transform 300ms ease-in-out;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  opacity: 1;
  background-color: blue;
  flex-direction: column;
  justify-content: center;

  ${({ active }) => active && Visible}

  transform: translateY(100%);
  transition: transform 300ms ease-in-out, visibility 300ms;
`;

// eslint-disable-next-line react/prop-types
const PlayerControls = ({ id }) => (
  <PlayerWrapper isPlaying>
    {({ active }) => (
      <div
        style={{ display: 'flex', boxSizing: 'border-box', overflow: 'hidden', position: 'relative', width: '100%' }}
      >
        <div id={id} />
        <Overlay active={active} />
      </div>
    )}
  </PlayerWrapper>
);

stories
  .add('default', () => (
    <PlayerWrapper isPlaying>
      {({ active }) => (
        <>
          <div style={{ width: '500px', height: '500px', backgroundColor: active ? 'black' : 'white', opacity: 0.4 }} />
        </>
      )}
    </PlayerWrapper>
  ))
  .add('JWPlayer', () => (
    <ETPlayer
      loginEndpoints={{
        forgotPasswordUrl: 'https://eurosport.fr',
        subscribeUrl: 'https://eurosport.fr',
        needHelpUrl: 'https://eurosport.fr',
      }}
      locale="en"
      elementId="playerId"
      jwplayerData={{ id: 'DWNosgcz' }}
      videoData={{
        controls: true,
        provider: 'url',
        id: 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8',
      }}
      {...events}
      PlayerControls={PlayerControls}
    />
  ));
