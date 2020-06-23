import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class ScriptInjector extends React.Component {
  componentDidMount() {
    const { isServer, src, innerHTML, injectPlace, async, id, onLoad } = this.props;

    if (isServer) return;

    if (id && document.getElementById(id) !== null) return;

    this.script = document.createElement('script');

    if (src) {
      this.script.src = src;
    }

    if (onLoad) {
      this.script.onload = () => onLoad();
    }

    if (async) {
      this.script.async = true;
    }

    if (id) {
      this.script.id = id;
    }

    this.script.innerHTML = innerHTML;

    document[injectPlace].appendChild(this.script);
  }

  componentWillUnmount() {
    const { injectPlace } = this.props;

    if (this.script) {
      document[injectPlace].removeChild(this.script);
    }
  }

  render() {
    const { id, src, async, isServer, innerHTML, injectPlace } = this.props;

    if (isServer) {
      const ssrProps = {
        src,
        async,
        id,
      };

      if (injectPlace === 'body') {
        return innerHTML ? (
          // eslint-disable-next-line react/no-danger
          <script {...ssrProps} dangerouslySetInnerHTML={{ __html: innerHTML }} />
        ) : (
          <script {...ssrProps} />
        );
      }

      // eslint-disable-next-line react/no-danger-with-children
      return <Helmet>{innerHTML ? <script {...ssrProps}>{`${innerHTML}`}</script> : <script {...ssrProps} />}</Helmet>;
    }
    return null;
  }
}

ScriptInjector.defaultProps = {
  src: '',
  innerHTML: '',
  async: false,
  injectPlace: 'head',
  id: undefined,
  onLoad: undefined,
};

ScriptInjector.propTypes = {
  isServer: PropTypes.bool.isRequired,
  id: PropTypes.string,
  src: PropTypes.string,
  innerHTML: PropTypes.string,
  injectPlace: PropTypes.oneOf(['head', 'body']),
  async: PropTypes.bool,
  onLoad: PropTypes.func,
};

export default ScriptInjector;
