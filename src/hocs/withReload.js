import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { isOnViewPort, isTopMost } from './visibilityHelpers';

function cleanQueryString() {
  if (window.location.search.indexOf('?_ga') > -1) {
    window.history.replaceState(null, null, window.location.href.replace(window.location.search, ''));
  }
}

const withReload = Component =>
  class WithReload extends React.PureComponent {
    static propTypes = {
      reloadInterval: PropTypes.number,
      screenPoints: PropTypes.number,
      refreshHandler: PropTypes.func.isRequired,
    };

    static defaultProps = {
      reloadInterval: 30 * 1000,
      screenPoints: 3,
    };

    static displayName = `withReload(${Component.displayName || Component.name || 'Component'})`;

    state = {
      isActive: false,
    };

    handleScrollResize = throttle(this.checkIsActive.bind(this), 250);

    reloadRef = React.createRef();

    timer = null;

    events = ['scroll', 'resize'];

    componentDidMount() {
      cleanQueryString();
      this.checkIsActive();
      this.initListeners();
    }

    componentDidUpdate() {
      const { isActive } = this.state;

      if (isActive) {
        this.timer = this.runRefreshTimer();
      } else {
        this.clearTimer();
      }
    }

    componentWillUnmount() {
      this.events.forEach(event => {
        window.removeEventListener(event, this.handleScrollResize);
      });

      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }

    handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        this.timer = this.runRefreshTimer();
      } else {
        this.clearTimer();
      }
    };

    initListeners() {
      this.events.forEach(event => {
        window.addEventListener(event, this.handleScrollResize);
      });

      document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    refresh() {
      const { current } = this.reloadRef;
      const { refreshHandler } = this.props;

      refreshHandler(current.id);
    }

    runRefreshTimer() {
      const { reloadInterval } = this.props;

      return setTimeout(() => {
        const isActive = this.checkIsActive();

        this.clearTimer();

        if (isActive) {
          this.refresh();
          this.timer = this.runRefreshTimer();
        }
      }, reloadInterval);
    }

    checkIsActive() {
      const { current } = this.reloadRef;
      const { screenPoints } = this.props;

      const onViewPort = isOnViewPort(current);
      const topMost = isTopMost(current, screenPoints);
      const empty = current.classList.contains('slot-empty');
      const isActive = onViewPort && (topMost || empty);

      this.setState({
        isActive,
      });

      return isActive;
    }

    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    }

    render() {
      return <Component ref={this.reloadRef} {...this.props} />;
    }
  };

export default withReload;
