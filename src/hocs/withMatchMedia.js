import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { points } from '../breakpoints';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const withMatchMedia = (mediaQueryString, injectedProp = 'breakpointMatched') => Component => {
  class Decorated extends React.Component {
    state = {
      matches: false,
    };

    static displayName = `withMatchMedia(${getDisplayName(Component)})`;

    componentDidMount() {
      this.mediaQueryList = window.matchMedia(mediaQueryString);
      this.onMediaChange(this.mediaQueryList);
      this.mediaQueryList.addListener(this.onMediaChange);
    }

    componentWillUnmount() {
      this.mediaQueryList.removeListener(this.onMediaChange);
    }

    onMediaChange = mql => this.setState({ matches: mql.matches });

    render() {
      const {
        state: { matches },
        props,
      } = this;

      const newProps = {
        ...props,
        [injectedProp]: matches,
      };

      return <Component {...newProps} />;
    }
  }

  hoistNonReactStatic(Decorated, Component);

  return Decorated;
};

export const HideOnMobile = withMatchMedia(`(min-width: ${points.medium}px)`)(({ breakpointMatched, ...props }) =>
  breakpointMatched ? props.children : null
);

export const LegacyHideOnMobile = withMatchMedia(`(min-width: 700px)`)(({ breakpointMatched, ...props }) =>
  breakpointMatched ? props.children : null
);

HideOnMobile.displayName = 'HideOnMobile';

export default withMatchMedia;
