import React from 'react';
import PropTypes from 'prop-types';

const QuantcastStyle = () => (
  <style
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `.qc-cmp-button {
  background-color: #141B4D !important;
  border-color: #141B4D !important;
  }
  .qc-cmp-button:hover {
  background-color: transparent !important;
  border-color: #141B4D !important;
  color: #141B4D !important;
  }
  .qc-cmp-alt-action,
  .qc-cmp-link {
  color: #141B4D !important;
  }
  .qc-cmp-button {
  color: #ffffff !important;
  }
  .qc-cmp-ui,
  .qc-cmp-ui .qc-cmp-main-messaging,
  .qc-cmp-ui .qc-cmp-messaging,
  .qc-cmp-ui .qc-cmp-beta-messaging,
  .qc-cmp-ui .qc-cmp-title,
  .qc-cmp-ui .qc-cmp-sub-title,
  .qc-cmp-ui .qc-cmp-purpose-info,
  .qc-cmp-ui .qc-cmp-table,
  .qc-cmp-ui .qc-cmp-table-header,
  .qc-cmp-ui .qc-cmp-vendor-list,
  .qc-cmp-ui .qc-cmp-vendor-list-title {
  color: #3D4248 !important;
  }
  .qc-cmp-ui a,
  .qc-cmp-ui .qc-cmp-alt-action {
  color: #141B4D !important;
  }
  .qc-cmp-ui {
  background-color: #ffffff !important;
  }
  .qc-cmp-publisher-purposes-table .qc-cmp-table-header {
  background-color: #fafafa !important;
  }
  .qc-cmp-publisher-purposes-table .qc-cmp-table-row {
  background-color: #ffffff !important;
  }
  .qc-cmp-toggle-status {
  color : #97999B !important;
  }
  .qc-cmp-publisher-purposes-table .qc-cmp-toggle-status {
  color : #ffffff !important;
  }

  .qc-cmp-toggle {
  border:1px solid #ccc !important;
  }

  .qc-cmp-toggle-switch {
  top:-1px !important;
  border:1px solid #ccc !important;
  }
  .qc-cmp-toggle-off {
  background:#ccc !important;
  }

  .qc-cmp-arrow-down {
  background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23141B4D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 5l6 6 6-6'/%3E%3C/svg%3E") 50% no-repeat !important;
  cursor:pointer;
  }

  .qc-cmp-purposes-header .qc-cmp-secondary-button {
  display:none;
  }



    @media screen and (max-width: 640px) {

      .qc-cmp-nav-bar-buttons-container .qc-cmp-button {
        white-space: normal;
        line-height: 1.1;
        font-size: 10px;
        margin: 10px 3px 10px 3px !important;
      }

      .qc-cmp-button.qc-cmp-save-and-exit {
        font-size: 10px;
      }

      .qc-cmp-ui .qc-cmp-title {
        font-size: 26px;
      }

      .qc-cmp-ui .qc-cmp-main-messaging {
        font-size: 12px;
      }

    }`,
    }}
  />
);

const injectQuantcastScript = (scriptUrl, cmpConf) => {
  /*eslint-disable */
  const elem = document.createElement('script');
  elem.src = scriptUrl;
  elem.async = true;
  elem.type = 'text/javascript';
  const scpt = document.getElementsByTagName('script')[0];
  scpt.parentNode.insertBefore(elem, scpt);
  (function() {
    const gdprAppliesGlobally = false;
    function addFrame() {
      if (!window.frames.__cmpLocator) {
        if (document.body) {
          const body = document.body;

          const iframe = document.createElement('iframe');
          iframe.style.cssText = 'display:none';
          iframe.name = '__cmpLocator';
          body.appendChild(iframe);
        } else {
          // In the case where this stub is located in the head,
          // this allows us to inject the iframe more quickly than
          // relying on DOMContentLoaded or other events.
          setTimeout(addFrame, 5);
        }
      }
    }
    addFrame();
    function cmpMsgHandler(event) {
      const msgIsString = typeof event.data === 'string';
      let json;
      if (msgIsString) {
        json = event.data.indexOf('__cmpCall') != -1 ? JSON.parse(event.data) : {};
      } else {
        json = event.data;
      }
      if (json.__cmpCall) {
        const i = json.__cmpCall;
        window.__cmp(i.command, i.parameter, (retValue, success) => {
          const returnMsg = {
            __cmpReturn: {
              returnValue: retValue,
              success,
              callId: i.callId,
            },
          };
          event.source.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, '*');
        });
      }
    }
    window.__cmp = function(c) {
      const b = arguments;
      if (!b.length) {
        return __cmp.a;
      }
      if (b[0] === 'ping') {
        b[2](
          {
            gdprAppliesGlobally,
            cmpLoaded: false,
          },
          true
        );
      } else if (c == '__cmp') return false;
      else {
        if (typeof __cmp.a === 'undefined') {
          __cmp.a = [];
        }
        __cmp.a.push([].slice.apply(b));
      }
    };
    window.__cmp.gdprAppliesGlobally = gdprAppliesGlobally;
    window.__cmp.msgHandler = cmpMsgHandler;
    if (window.addEventListener) {
      window.addEventListener('message', cmpMsgHandler, false);
    } else {
      window.attachEvent('onmessage', cmpMsgHandler);
    }
  })();
  window.__cmp('init', cmpConf);
  /* eslint-enable */
};

const Quantcast = ({ scriptUrl, cmpConf }) => {
  if (cmpConf) {
    injectQuantcastScript(scriptUrl, cmpConf);
    return <QuantcastStyle />;
  }
  return null;
};

Quantcast.defaultProps = {
  scriptUrl: 'https://quantcast.mgr.consensu.org/v14/cmp.js',
  cmpConf: {},
};

Quantcast.propTypes = {
  scriptUrl: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  cmpConf: PropTypes.object,
};

export default Quantcast;
