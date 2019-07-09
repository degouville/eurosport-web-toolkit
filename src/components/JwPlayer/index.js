import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScriptInjector from '../ScriptInjector';

const playerId = 'eurosport-web-player';

export const ONE_FRAME = 16.7;

export const StyledCloseButton = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 17px;
  height: 17px;
  background: url(${Cross}) no-repeat center center;
  cursor: pointer;
`;

export const StyledStickyCotent = styled.div`
  display: none;

  ${props =>
    props.isVisible &&
    css`
      padding: 0 20px;
      flex: 5;
      display: block;
      overflow: hidden;
      position: relative;
    `}
`;

const StyledPlayer = styled.div`
  ${props =>
    props.isSticky &&
    css`
      background: ${coreLightMinus1};
      box-sizing: border-box;
      margin: 0 auto;
      display: flex;
      animation: slide-up 250ms ease-out forwards;
      flex-flow: nowrap row;
      align-items: center;
      width: 100%;
      max-width: 355px;
      height: 67px;
      color: ${brandPlus2};
      border-radius: 4px;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      box-shadow: 0 0 30px 10px rgba(0,0,0,0.2);
      
      > div[id = ${playerId}] {
        flex: 3;
        max-width: 121px;

        ${medium(css`
          max-width: 146px;
        `)}

        ${wide(css`
          max-width: 198px;
        `)}
      }
      
      ${StyledStickyCotent} {
        flex-grow: 1;
        flex-shrink: 1;
      }

      ${medium(css`
        height: 80px;
        max-width: 516px;
      `)}
      
      ${large(css`
        max-width: 534px;
      `)}
      
      ${wide(css`
        height: 104px;
        max-width: 552px;
      `)}
    `}

  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }

    to {
      transform: translateY(0);
    }
  }
`;

export const StyledPlayerWrapper = styled.div`
  ${props =>
    props.isSticky &&
    css`
      display: block;
      width: 100%;
      position: fixed;
      left: 0;
      ${props.stickTo}: 20px;
    `}
`;

const StyledWrapper = styled.div`
  ${props =>
    props.minHeight &&
    css`
      background-color: olivedrab;
      min-height: ${props.minHeight}px;
    `}
`;

export default class Player extends Component {
  styledWrapperRef = React.createRef();

  state = {
    isPlaying: false,
    isPlayerSticky: false,
    isStickyPanelClosed: false,
    minWrapperHeight: null,
  };

  handleStickyOnScroll = debounce(() => {
    const { isStickyPanelClosed } = this.state;
    const wrapperElement = this.styledWrapperRef.current;
    const { top, bottom, height } = wrapperElement.getBoundingClientRect();
    const { clientHeight } = document.documentElement;

    if (bottom <= 0 || top > clientHeight) {
      if (!isStickyPanelClosed)
        this.setState({
          minWrapperHeight: height,
          isPlayerSticky: true,
        });
    } else {
      this.setState({
        isPlayerSticky: false,
        minWrapperHeight: null,
        isStickyPanelClosed: false,
      });
    }
  }, ONE_FRAME);

  componentDidMount() {
    const { stickyContent } = this.props;

    if (stickyContent) {
      window.addEventListener('resize', this.handleStickyOnScroll);
      window.addEventListener('scroll', this.handleStickyOnScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleStickyOnScroll);
    window.removeEventListener('scroll', this.handleStickyOnScroll);
  }

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

  handlePlay = () => {
    this.setState({
      isPlaying: true,
    });
  };

  handlePause = () => {
    this.setState({
      isPlaying: false,
    });
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
      .on('play', (...args) => {
        onPlay(args);
        this.handlePlay();
      })
      .on('pause', (...args) => {
        onPause(args);
        this.handlePause();
      })
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

  closeStickyPanel = () => {
    this.setState({
      isPlayerSticky: false,
      isStickyPanelClosed: true,
    });
  };

  handleStickyPlayerClick = () => {
    const { isPlayerSticky, isPlaying } = this.state;
    const { onStickyPlayerClick } = this.props;

    if (isPlayerSticky && isPlaying) {
      onStickyPlayerClick();
    }
  };

  render() {
    const { scriptUrl } = this.props;

    return (
      <StyledWrapper innerRef={this.styledWrapperRef} minHeight={minWrapperHeight}>
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
