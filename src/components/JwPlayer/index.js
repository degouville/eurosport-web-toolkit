import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import debounce from 'lodash/debounce';
import Cross from 'src/assets/close-cross.component.svg';
import { medium, wide } from 'src/breakpoints';
import ScriptInjector from '../ScriptInjector';
import { blackPearl, white } from '../../colors';
import { StyledTeamName } from '../ScoreBlock/SetsScore';

export const playerId = 'eurosport-web-player';

export const ONE_FRAME = 16.7;

export const StyledCloseButton = styled(Cross)`
  display: none;
  ${props =>
    props.isVisible &&
    css`
      display: initial;
    `}
  position: absolute;
  top: 24px;
  right: 20px;
  transform: translateY(-50%);
  width: 17px;
  height: 17px;
  cursor: pointer;
  path {
    fill: black;
  }
`;

export const StyledStickyContent = styled.div`
  visibility: hidden;
  ${props =>
    props.isVisible &&
    css`
      visibility: inherit;
      padding: 0 40px 0 20px;
      display: block;
      position: relative;
      ${medium(css`
        padding-right: 50px;
      `)}
    `}

  ${StyledTeamName} {
    margin: 5px 0 5px 6px;
  }
`;

const StyledPlayer = styled.div`
  ${props =>
    props.isSticky &&
    css`
      background: ${white};
      box-sizing: border-box;
      margin: 0 auto;
      display: flex;
      animation: ${css`slide-from-${props.stickTo} 250ms ease-out forwards`};
      flex-flow: nowrap row;
      align-items: center;
      width: 100%;
      max-width: 355px;
      height: 67px;
      color: ${blackPearl};
      border-radius: 4px;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      box-shadow: 0 0 30px 10px rgba(0, 0, 0, 0.2);

      > #${playerId} {
        width: calc((16 / 9) * ${props.stickyContentHeight}px);
        min-width: 121px;
        min-height: 56px;
        flex: auto;

        ${medium(css`
          min-width: 146px;
        `)}

        ${wide(css`
          min-width: 198px;
        `)}
      }

      ${StyledStickyContent} {
        font-weight: 700;
        line-height: 20px;
        ${medium(css`
          flex: none;
          max-width: 500px;
        `)}
      }

      ${medium(css`
        max-width: 673px;
      `)}
    `}

  @keyframes slide-from-bottom {
    from {
      transform: translateY(100%);
    }

    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-from-top {
    from {
      transform: translateY(-100%);
    }

    to {
      transform: translateY(0);
    }
  }
`;

export const StyledPlayerWrapper = styled.div`
  will-change: transform;
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
      min-height: ${props.minHeight}px;
    `}
`;

const StyledStickyWrapper = styled.div`
  ${props =>
    props.isSticky &&
    css`
      display: table;
      margin: auto;
    `}
`;

export default class Player extends Component {
  styledWrapperRef = React.createRef();

  styledStickyContentRef = React.createRef();

  state = {
    isPlaying: false,
    isPlayerSticky: false,
    isStickyPanelClosed: false,
    minWrapperHeight: null,
    stickyContentHeight: null,
  };

  handleStickyOnScroll = debounce(() => {
    const { isStickyPanelClosed } = this.state;
    const wrapperElement = this.styledWrapperRef.current;
    const stickyContent = this.styledStickyContentRef.current;
    const { top, bottom, height } = wrapperElement.getBoundingClientRect();
    const { clientHeight } = document.documentElement;

    if (bottom <= 100 || top > clientHeight) {
      if (!isStickyPanelClosed)
        this.setState({
          minWrapperHeight: height,
          isPlayerSticky: true,
          stickyContentHeight: stickyContent?.offsetHeight,
        });
    } else {
      this.setState({
        isPlayerSticky: false,
        minWrapperHeight: null,
        isStickyPanelClosed: false,
        stickyContentHeight: stickyContent?.offsetHeight,
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
    const { scriptUrl, stickyContent, stickTo } = this.props;
    const { isPlaying, isPlayerSticky, minWrapperHeight, stickyContentHeight } = this.state;

    const shouldStickPlayer = isPlayerSticky && isPlaying;

    return (
      <StyledWrapper innerRef={this.styledWrapperRef} minHeight={minWrapperHeight}>
        <ScriptInjector isServer={false} src={scriptUrl} onLoad={this.initPlayer} />
        <StyledPlayerWrapper isSticky={shouldStickPlayer} stickTo={stickTo}>
          <StyledStickyWrapper isSticky={shouldStickPlayer}>
            <StyledPlayer isSticky={shouldStickPlayer} stickTo={stickTo} stickyContentHeight={stickyContentHeight}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div id={playerId} onClick={this.handleStickyPlayerClick} />
              <StyledStickyContent innerRef={this.styledStickyContentRef} isVisible={shouldStickPlayer}>
                {stickyContent}
              </StyledStickyContent>
              <StyledCloseButton isVisible={shouldStickPlayer} onClick={this.closeStickyPanel} />
            </StyledPlayer>
          </StyledStickyWrapper>
        </StyledPlayerWrapper>
      </StyledWrapper>
    );
  }
}

Player.defaultProps = {
  prefLang: undefined,
  subscribeUrl: undefined,
  freewheelAdParams: undefined,
  stickyContent: null,
  stickTo: 'bottom',

  onStickyPlayerClick: () => {},
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
  stickyContent: PropTypes.node,
  stickTo: PropTypes.oneOf(['bottom', 'top']),
  onStickyPlayerClick: PropTypes.func,

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
