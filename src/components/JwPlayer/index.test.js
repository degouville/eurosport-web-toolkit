import React from 'react';
import { shallow } from 'enzyme';
import Player from '.';
import ScriptInjector from '../ScriptInjector';

let setupSpy;

class PlayerMock {
  constructor() {
    this.events = {
      on: {},
    };
  }

  trigger(eventName, argument = {}) {
    this.events.on[eventName].forEach(fn => fn(argument));
  }

  on(eventName, fn) {
    this.events.on[eventName] = this.events.on[eventName] || [];
    this.events.on[eventName].push(fn);
    return this;
  }

  setup(opts) {
    setupSpy && setupSpy(opts);
    return this;
  }
}

describe('components/<Player />', () => {
  const scope = {
    scriptUrl: 'player-script',
    configurationUrl: '',
    entityId: 'E1FR',
    streamType: 'channel_live',
    title: 'lorem ipsum',
    prefLang: 'en',
    subscribeUrl: 'some url',
    freewheelAdParams: {
      fwassetId: '13',
      sectionId: `europsort.com_web_tablet_video`,
    },

    wrapper: null,
  };

  const initialProps = {
    scriptUrl: scope.scriptUrl,
    configurationUrl: scope.configurationUrl,
    entityId: scope.entityId,
    streamType: scope.streamType,
    title: scope.title,
  };

  const testEvent = (eventName, propName) => {
    const mockFn = jest.fn();

    const props = {
      ...initialProps,
      [propName]: mockFn,
    };

    const wrapper = shallow(<Player {...props} />);

    wrapper.find(ScriptInjector).simulate('load');
    wrapper.instance().player.trigger(eventName);

    expect(mockFn).toHaveBeenCalled();
  };

  beforeEach(() => {
    setupSpy = jest.fn();
    global.EurosportPlayer = () => new PlayerMock();
    scope.wrapper = shallow(<Player {...initialProps} />);
  });

  it('should pass player script src to ScriptInjector', () => {
    expect(scope.wrapper.find(ScriptInjector).props().src).toBe(scope.scriptUrl);
  });

  describe('player setup', () => {
    beforeEach(() => {
      const props = {
        ...initialProps,
        prefLang: scope.prefLang,
        subscribeUrl: scope.subscribeUrl,
        freewheelAdParams: scope.freewheelAdParams,
      };

      scope.wrapper = shallow(<Player {...props} />);
    });

    it('should call setup with mapping of received props', () => {
      scope.wrapper.find(ScriptInjector).simulate('load');

      expect(setupSpy.mock.calls[0][0]).toEqual({
        configurationUrl: scope.configurationUrl,
        autoplay: true,
        isPremium: true,
        equinoxeId: scope.entityId,
        streamType: scope.streamType,
        prefLang: scope.prefLang,
        subscribeUrl: scope.subscribeUrl,
        freewheelAdParams: scope.freewheelAdParams,
        videoMeta: {
          id: scope.entityId,
          title: scope.title,
          duration: null,
        },
      });
    });

    it('calls calculatePlayerOptions() on setup', () => {
      const optionsSpy = jest.spyOn(scope.wrapper.instance(), 'calculatePlayerOptions');

      scope.wrapper.find(ScriptInjector).simulate('load');

      expect(optionsSpy).toHaveBeenCalled();
    });
  });

  describe('ready event handler', () => {
    it(`should call onReady on ready event`, () => {
      testEvent('ready', 'onReady');
    });
  });

  describe('loginReady event handler', () => {
    it(`should call onLoginReady on loginReady event`, () => {
      testEvent('loginReady', 'onLoginReady');
    });
  });

  describe('play event handler', () => {
    it(`should call onPlay on play event`, () => {
      testEvent('play', 'onPlay');
    });
  });

  describe('pause event handler', () => {
    it(`should call onPause on pause event`, () => {
      testEvent('pause', 'onPause');
    });
  });

  describe('adBreakStart event handler', () => {
    it(`should call onAdBreakStart on adBreakStart event`, () => {
      testEvent('adBreakStart', 'onAdBreakStart');
    });
  });

  describe('adBreakComplete event handler', () => {
    it(`should call onAdBreakComplete on adBreakComplete event`, () => {
      testEvent('adBreakComplete', 'onAdBreakComplete');
    });
  });

  describe('adStart event handler', () => {
    it(`should call onAdStart on adStart event`, () => {
      testEvent('adStart', 'onAdStart');
    });
  });

  describe('adTime event handler', () => {
    it(`should call onAdTime on adTime event`, () => {
      testEvent('adTime', 'onAdTime');
    });
  });

  describe('adComplete event handler', () => {
    it(`should call onAdComplete on adComplete event`, () => {
      testEvent('adComplete', 'onAdComplete');
    });
  });

  describe('modalAfterClose event handler', () => {
    it(`should call onModalClosed on modalAfterClose event`, () => {
      testEvent('modalAfterClose', 'onModalClosed');
    });
  });

  describe('error event handler', () => {
    it(`should call onError on error event`, () => {
      global.console = { log: jest.fn(), error: jest.fn() };
      testEvent('error', 'onError');
    });
  });
});
