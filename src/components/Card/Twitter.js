import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ScriptInjector from '../ScriptInjector';

// https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites
const twitterScriptSetup = `
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"))
`;

export const getTweetIdFromUrl = url => {
  const match = url.match(/\d+$/);
  return match && match[0];
};

export default class Twitter extends PureComponent {
  state = {
    initialised: false,
  };

  tweetRef = React.createRef();

  componentDidMount() {
    window.twttr.ready(this.setInitialised);
  }

  componentDidUpdate() {
    this.loadTweet();
  }

  setInitialised = () => {
    this.setState({ initialised: true });
  };

  loadTweet = () => {
    const { tweetUrl } = this.props;
    const { initialised } = this.state;
    if (!initialised) return;

    const tweetId = getTweetIdFromUrl(tweetUrl);
    if (tweetId === null) return;
    window.twttr.widgets.createTweet(tweetId.toString(), this.tweetRef.current);
  };

  render() {
    const { tweetUrl, className } = this.props;

    return (
      <div ref={this.tweetRef} key={tweetUrl} className={className}>
        <ScriptInjector isServer={false} innerHTML={twitterScriptSetup} />
      </div>
    );
  }
}

Twitter.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  tweetUrl: PropTypes.string.isRequired,
};
