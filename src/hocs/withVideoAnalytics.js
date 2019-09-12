import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function withVideoAnalytics
 *
 * @description Enable to send analytics action to your provider
 *
 * @param VideoPlayerComponent
 */
const withVideoAnalytics = VideoPlayerComponent =>
  class VideoAnalytics extends React.Component {
    static defaultProps = {
      analytics: undefined,
      onReady: undefined,
      onLoginReady: undefined,
      onAdBreakStart: undefined,
      onAdBreakComplete: undefined,
      onAdStart: undefined,
      onAdTime: undefined,
      onAdComplete: undefined,
      onPlay: undefined,
      onPause: undefined,
      onSeek: undefined,
      onSeeked: undefined,
    };

    static propTypes = {
      analytics: PropTypes.shape({
        onReady: PropTypes.func.isRequired,
        onLoginReady: PropTypes.func.isRequired,
        onAdBreakStart: PropTypes.func.isRequired,
        onAdBreakComplete: PropTypes.func.isRequired,
        onAdStart: PropTypes.func.isRequired,
        onAdTime: PropTypes.func.isRequired,
        onAdComplete: PropTypes.func.isRequired,
        onPlay: PropTypes.func.isRequired,
        onPause: PropTypes.func.isRequired,
        onSeek: PropTypes.func.isRequired,
        onSeeked: PropTypes.func.isRequired,
      }),
      onReady: PropTypes.func,
      onLoginReady: PropTypes.func,
      onAdBreakStart: PropTypes.func,
      onAdBreakComplete: PropTypes.func,
      onAdStart: PropTypes.func,
      onAdTime: PropTypes.func,
      onAdComplete: PropTypes.func,
      onPlay: PropTypes.func,
      onPause: PropTypes.func,
      onSeek: PropTypes.func,
      onSeeked: PropTypes.func,
    };

    static eventList = [
      'onReady',
      'onLoginReady',
      'onAdBreakStart',
      'onAdBreakComplete',
      'onAdStart',
      'onAdTime',
      'onAdComplete',
      'onPlay',
      'onPause',
      'onSeek',
      'onSeeked',
    ];

    generateEvents = list =>
      list.reduce((acc, eventValue) => {
        const { props } = this;
        const { analytics } = props;
        const eventAction = props[eventValue];
        return {
          ...acc,
          [eventValue]: (...args) => {
            eventAction && eventAction(...args);
            analytics && analytics[eventValue] && analytics[eventValue](...args);
          },
        };
      }, {});

    render() {
      const newProps = {
        ...this.props,
        ...this.generateEvents(VideoAnalytics.eventList),
      };

      return <VideoPlayerComponent {...newProps} />;
    }
  };

export default withVideoAnalytics;
