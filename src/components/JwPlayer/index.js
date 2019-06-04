import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScriptInjector from '../ScriptInjector';

const playerId = 'eurosport-web-player';

export default class Player extends Component {
  calculatePlayerOptions = () => {
    const { entityId, streamType, configurationUrl, prefLang, title, subscribeUrl, freewheelAdParams } = this.props;

    return {
      configurationUrl,
      autoplay: true,
      isPremium: true,
      equinoxeId: entityId,
      streamType,
      prefLang,
      subscribeUrl,
      freewheelAdParams,
      videoMeta: {
        id: entityId,
        duration: null,
        title,
      },
    };
  };

  initPlayer = () => {
    const {
      onReady,
      onLoginReady,
      onPlay,
      onPause,
      onAdBreakStart,
      onAdBreakComplete,
      onAdStart,
      onAdTime,
      onAdComplete,
      onModalClosed,
      onError,
    } = this.props;

    this.player = window
      .EurosportPlayer(playerId)
      .on('ready', onReady)
      .on('loginReady', onLoginReady)
      .on('play', onPlay)
      .on('pause', onPause)
      .on('adBreakStart', onAdBreakStart)
      .on('adBreakComplete', onAdBreakComplete)
      .on('adStart', onAdStart)
      .on('adTime', onAdTime)
      .on('adComplete', onAdComplete)
      .on('modalAfterClose', modalName => {
        onModalClosed(modalName);
      })
      .on('error', error => {
        /* eslint-disable-next-line no-underscore-dangle,no-console */
        console.log(`[Error] ${error._code}:${error.reason}`);
        console.error(error);

        onError(error);
      })
      .setup(this.calculatePlayerOptions());
  };

  render() {
    const { scriptUrl } = this.props;

    return (
      <>
        <ScriptInjector isServer={false} src={scriptUrl} onLoad={this.initPlayer} />
        <div id={playerId} />
      </>
    );
  }
}

Player.defaultProps = {
  prefLang: undefined,
  subscribeUrl: undefined,
  freewheelAdParams: undefined,

  onReady: () => {},
  onLoginReady: () => {},
  onPlay: () => {},
  onPause: () => {},
  onAdBreakStart: () => {},
  onAdBreakComplete: () => {},
  onAdStart: () => {},
  onAdTime: () => {},
  onAdComplete: () => {},
  onError: () => {},
  onModalClosed: () => {},
};

Player.propTypes = {
  scriptUrl: PropTypes.string.isRequired,
  configurationUrl: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  streamType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,

  prefLang: PropTypes.string,
  subscribeUrl: PropTypes.string,
  freewheelAdParams: PropTypes.shape({
    adManagerURL: PropTypes.string,
    serverURL: PropTypes.string,
    networkID: PropTypes.number,
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

  onReady: PropTypes.func,
  onLoginReady: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onAdBreakStart: PropTypes.func,
  onAdBreakComplete: PropTypes.func,
  onAdStart: PropTypes.func,
  onAdTime: PropTypes.func,
  onAdComplete: PropTypes.func,
  onError: PropTypes.func,
  onModalClosed: PropTypes.func,
};
