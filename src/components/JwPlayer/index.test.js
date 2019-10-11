import React from 'react';
import { shallow, mount } from 'enzyme';
import Player, { playerId, StyledCloseButton, StyledPlayerWrapper, StyledStickyContent } from '.';
import ScriptInjector from '../ScriptInjector';

jest.mock('lodash/debounce', () => fn => fn);

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

    it('should call handlePlay and set isPlaying to be true', () => {
      const wrapper = shallow(<Player {...initialProps} />);
      const spyHandlePlay = jest.spyOn(wrapper.instance(), 'handlePlay');
      expect(wrapper.state('isPlaying')).toBe(false);

      wrapper.find(ScriptInjector).simulate('load');
      wrapper.instance().player.trigger('play');

      expect(spyHandlePlay).toHaveBeenCalled();
      expect(wrapper.state('isPlaying')).toBe(true);
    });
  });

  describe('pause event handler', () => {
    it(`should call onPause on pause event`, () => {
      testEvent('pause', 'onPause');
    });

    it('should call handlePause and set isPlaying to be false', () => {
      const wrapper = shallow(<Player {...initialProps} />);
      const spyHandlePause = jest.spyOn(wrapper.instance(), 'handlePause');
      wrapper.setState({
        isPlaying: true,
      });

      wrapper.find(ScriptInjector).simulate('load');
      wrapper.instance().player.trigger('pause');

      expect(spyHandlePause).toHaveBeenCalled();
      expect(wrapper.state('isPlaying')).toBe(false);
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

  describe('Player sticky mode', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('matches snapshot', () => {
      const wrapper = mount(
        <Player
          {...initialProps}
          stickyContent="sticky content"
          onStickyPlayerClick={() => '123'}
          isSticky
          minHeight={500}
        />
      );
      expect(wrapper.find(Player)).toMatchSnapshot();
    });

    it('sets up listeners on mount if stickyContnent provided', () => {
      const wrapper = shallow(<Player {...initialProps} stickyContent="sticky content" />);
      const fn = jest.spyOn(window, 'addEventListener');
      wrapper.instance().componentDidMount();
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn).toHaveBeenCalledWith('scroll', wrapper.instance().handleStickyOnScroll);
      expect(fn).toHaveBeenCalledWith('resize', wrapper.instance().handleStickyOnScroll);
      jest.resetAllMocks();
    });

    it('remove listeners on unmount', () => {
      const wrapper = shallow(<Player {...initialProps} stickyContent="sticky content" />);
      const fn = jest.spyOn(window, 'removeEventListener');
      wrapper.instance().componentWillUnmount();
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn).toHaveBeenCalledWith('scroll', wrapper.instance().handleStickyOnScroll);
      expect(fn).toHaveBeenCalledWith('resize', wrapper.instance().handleStickyOnScroll);
      jest.resetAllMocks();
    });

    it('does not set up listeners on mount if stickyContnent is not provided', () => {
      const fn = jest.spyOn(window, 'addEventListener');

      const wrapper = shallow(<Player {...initialProps} />);
      wrapper.instance().componentDidMount();
      expect(fn).toHaveBeenCalledTimes(0);
    });

    describe('instance / handleStickyOnScroll', () => {
      let wrapper;
      let mockBoundClientRect;
      let globalDoc;

      const mockIsOnscreenAndVisibleTop = () => {
        mockBoundClientRect = () => ({
          bottom: 410,
          top: 10,
          height: 400,
        });
      };

      const mockIsOnscreenAndVisibleBottom = () => {
        mockBoundClientRect = () => ({
          bottom: 390,
          top: -10,
          height: 400,
        });

        document.clientHeight = 400;
      };

      const mockIsOnScreenFull = () => {
        mockBoundClientRect = () => ({
          bottom: 120,
          top: 10,
          height: 90,
        });
      };

      const mockIsOutOfScreenAtTheTop = () => {
        mockBoundClientRect = () => ({
          bottom: -110,
          top: -210,
          height: 100,
        });
      };

      const mockIsOutOfScreenAtTheBottom = () => {
        mockBoundClientRect = () => ({
          bottom: 491,
          top: 401,
          height: 90,
        });
      };

      beforeEach(() => {
        wrapper = shallow(<Player {...initialProps} stickyContent="sticky content" />);
        wrapper.instance().styledWrapperRef.current = {
          getBoundingClientRect: () => mockBoundClientRect(),
        };
        wrapper.instance().styledStickyContentRef.current = {
          offsetHeight: 42,
        };

        delete global.document;

        global.document = {
          documentElement: {
            clientHeight: 400,
          },
        };
      });

      afterEach(() => {
        global.document = globalDoc;
      });

      describe('sticky logic: isPlayerSticky, minWrapperHeight setup', () => {
        it('it is false when wrapper is visible', () => {
          const invalidateState = () => {
            wrapper.setState({
              isPlayerSticky: true,
              isStickyPanelClosed: true,
              minWrapperHeight: '123',
            });
          };

          invalidateState();
          mockIsOnscreenAndVisibleTop();

          wrapper.instance().handleStickyOnScroll();
          expect(wrapper.state('isPlayerSticky')).toBe(false);
          expect(wrapper.state('isStickyPanelClosed')).toBe(false);
          expect(wrapper.state('minWrapperHeight')).toBe(null);

          invalidateState();
          mockIsOnscreenAndVisibleBottom();

          wrapper.instance().handleStickyOnScroll();
          expect(wrapper.state('isPlayerSticky')).toBe(false);
          expect(wrapper.state('isStickyPanelClosed')).toBe(false);
          expect(wrapper.state('minWrapperHeight')).toBe(null);

          invalidateState();
          mockIsOnScreenFull();

          wrapper.instance().handleStickyOnScroll();
          expect(wrapper.state('isPlayerSticky')).toBe(false);
          expect(wrapper.state('isStickyPanelClosed')).toBe(false);
          expect(wrapper.state('minWrapperHeight')).toBe(null);
        });

        it('it is true when wrapper is not visible', () => {
          const invalidateState = () => {
            wrapper.setState({
              isPlayerSticky: false,
              minWrapperHeight: '123',
            });
          };

          invalidateState();
          mockIsOutOfScreenAtTheBottom();

          wrapper.instance().handleStickyOnScroll();
          expect(wrapper.state('isPlayerSticky')).toBe(true);
          expect(wrapper.state('minWrapperHeight')).toBe(90);
          expect(wrapper.state('stickyContentHeight')).toBe(42);

          invalidateState();
          mockIsOutOfScreenAtTheTop();

          wrapper.instance().handleStickyOnScroll();
          expect(wrapper.state('isPlayerSticky')).toBe(true);
          expect(wrapper.state('minWrapperHeight')).toBe(100);
          expect(wrapper.state('stickyContentHeight')).toBe(42);
        });

        it('sets isPlayerSticky only when player out of screen and isStickyPanelClosed is false', () => {
          wrapper.setState({
            isStickyPanelClosed: false,
          });
          mockIsOutOfScreenAtTheTop();

          wrapper.instance().handleStickyOnScroll();
          expect(wrapper.state('isPlayerSticky')).toBe(true);

          wrapper.setState({
            isStickyPanelClosed: true,
            isPlayerSticky: false,
          });

          mockIsOutOfScreenAtTheTop();

          wrapper.instance().handleStickyOnScroll();
          expect(wrapper.state('isPlayerSticky')).toBe(false);
        });
      });

      describe('sticky panel', () => {
        const stickyPanel = w => w.find(StyledPlayerWrapper);

        it('sticks only when player is playing', () => {
          wrapper.setState({
            isPlayerSticky: true,
            isPlaying: true,
          });

          expect(stickyPanel(wrapper).prop('isSticky')).toBe(true);

          wrapper.setState({
            isPlayerSticky: true,
            isPlaying: false,
          });

          expect(stickyPanel(wrapper).prop('isSticky')).toBe(false);
        });

        it('can be unsticked by clicking the close button on a sticky panel', () => {
          wrapper.setState({
            isPlayerSticky: true,
            isPlaying: true,
          });
          expect(stickyPanel(wrapper).prop('isSticky')).toBe(true);
          wrapper.find(StyledCloseButton).simulate('click');

          expect(stickyPanel(wrapper).prop('isSticky')).toBe(false);
        });

        it('has stickTo prop', () => {
          expect(stickyPanel(wrapper).prop('stickTo')).toBe('bottom');
          wrapper.setProps({
            stickTo: 'top',
          });
          expect(stickyPanel(wrapper).prop('stickTo')).toBe('top');
        });

        describe('StickyContent', () => {
          it('contains sticky content from the wrapper', () => {
            expect(wrapper.find(StyledStickyContent).html()).toContain('sticky content');
          });

          it('displays the StickyContent if sticky', () => {
            wrapper.setState({
              isPlayerSticky: true,
              isPlaying: true,
            });

            expect(wrapper.find(StyledStickyContent).prop('isVisible')).toBe(true);
          });

          it('does not display StickyContent if not sticky', () => {
            wrapper.setState({
              isPlayerSticky: false,
              isPlaying: false,
            });

            expect(wrapper.find(StyledStickyContent).prop('isVisible')).toBe(false);

            wrapper.setState({
              isPlayerSticky: true,
              isPlaying: false,
            });

            expect(wrapper.find(StyledStickyContent).prop('isVisible')).toBe(false);
          });
        });

        describe('mini player panel', () => {
          it('executes onStickyPlayerClick click handler if panel sticked', () => {
            const clickHandler = jest.fn();

            wrapper.setProps({
              onStickyPlayerClick: clickHandler,
            });
            wrapper.setState({
              isPlaying: true,
              isPlayerSticky: true,
            });

            wrapper.find({ id: playerId }).simulate('click');
            expect(clickHandler).toHaveBeenCalledTimes(1);
          });

          it('does not execute onStickyPlayerClick click handler if not sticky', () => {
            const clickHandler = jest.fn();

            wrapper.setProps({
              onStickyPlayerClick: clickHandler,
            });
            wrapper.setState({
              isPlaying: false,
              isPlayerSticky: true,
            });

            wrapper.find({ id: playerId }).simulate('click');
            expect(clickHandler).toHaveBeenCalledTimes(0);

            wrapper.setState({
              isPlaying: true,
              isPlayerSticky: false,
            });

            wrapper.find({ id: playerId }).simulate('click');
            expect(clickHandler).toHaveBeenCalledTimes(0);
          });
        });
      });
    });
  });
});
