import React from 'react';
import PropTypes from 'prop-types';
import ETPlayerComponent from '@eurosport/toolkit-player';

const ETPlayer = ({
  prefLang,
  elementId,
  jwplayerData,
  videoData,
  onReady,
  onPlay,
  onPause,
  onAdBreakStart,
  onAdBreakComplete,
  onAdStart,
  onAdTime,
  onError,
  onLoginModalReady,
  onLoginModalDone,
}) => (
  <ETPlayerComponent
    locale={prefLang}
    elementId={elementId}
    jwplayerData={jwplayerData}
    videoData={videoData}
    onReady={onReady}
    onPlay={onPlay}
    onPause={onPause}
    onAdBreakStart={onAdBreakStart}
    onAdBreakComplete={onAdBreakComplete}
    onAdStart={onAdStart}
    onAdTime={onAdTime}
    onError={onError}
    onLoginModalReady={onLoginModalReady}
    onLoginModalDone={onLoginModalDone}
  />
);

ETPlayer.defaultProps = {
  onReady: null,
  onPlay: null,
  onPause: null,
  onAdBreakStart: null,
  onAdBreakComplete: null,
  onAdStart: null,
  onAdTime: null,
  onError: null,
  onLoginModalReady: null,
  onLoginModalDone: null,
};

ETPlayer.propTypes = {
  prefLang: PropTypes.string.isRequired,
  elementId: PropTypes.string.isRequired,

  jwplayerData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,

  videoData: PropTypes.shape({
    provider: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.number,
    type: PropTypes.string,

    sonic: PropTypes.shape({
      baseUrl: PropTypes.string.isRequired,
      realm: PropTypes.string.isRequired,
    }),

    mux: PropTypes.shape({
      env_key: PropTypes.string.isRequired,
    }),

    freewheelAdParams: PropTypes.shape({
      adManagerURL: PropTypes.string.isRequired,
      serverURL: PropTypes.string.isRequired,
      networkID: PropTypes.number.isRequired,
      fwassetId: PropTypes.string,
      profileId: PropTypes.string,
      sectionId: PropTypes.string,
      video_targeting: PropTypes.string,
      auth: PropTypes.string,
      sport: PropTypes.string,
      afid: PropTypes.string,
      vdur: PropTypes.number,
      _fw_gdpr: PropTypes.number,
      _fw_gdpr_consent: PropTypes.string,
    }),
  }).isRequired,

  // Events
  onReady: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onAdBreakStart: PropTypes.func,
  onAdBreakComplete: PropTypes.func,
  onAdStart: PropTypes.func,
  onAdTime: PropTypes.func,
  onError: PropTypes.func,
  onLoginModalReady: PropTypes.func,
  onLoginModalDone: PropTypes.func,
};

export default ETPlayer;
