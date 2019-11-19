import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import Spinner from 'src/elements/Spinner';
import { BottomBar, SkipContainer, SkipLabel, SkipTimer, StyledSkipIcon } from './index';

describe('Components|JWPlayerETP|Controls|BottomBar', () => {
  const Component = () => <div id="children-to-display" />;
  const skipTime = 6;

  const createDefaultProps = newProps => ({
    isLive: true,
    children: <Component />,
    skipEnabled: true,
    skipTime: 6,
    rewindCounts: undefined,
    onSeek: jest.fn(),
    seekMin: 0,
    seekMax: 100,
    seekPosition: 50,
    theme: {
      playerControls: {
        seek: {
          trackColor: 'blue',
          handleSize: 20,
          handleColor: 'red',
          railColor: 'green',
          railThickness: 5,
          vertical: false,
        },
      },
    },
    volume: 50,
    mute: false,
    onVolume: jest.fn(),
    onMute: jest.fn(),
    onSkipAd: jest.fn(),
    isAdPlaying: false,
    ...newProps,
  });

  it('Should match snapshot', () => {
    // Given
    const props = createDefaultProps();

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BottomBar {...props} />
      </ThemeProvider>
    ).find(BottomBar);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('Should not display SkipContainer if isAdPlaying is false', () => {
    // Given
    const props = createDefaultProps();

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BottomBar {...props} />
      </ThemeProvider>
    ).find(BottomBar);

    // Expect
    expect(wrapper.find(SkipContainer)).toHaveLength(0);
  });

  it('Should display SkipContainer if isAdPlaying is true', () => {
    // Given
    const props = createDefaultProps({ isAdPlaying: true });

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BottomBar {...props} />
      </ThemeProvider>
    ).find(BottomBar);

    // Expect
    expect(wrapper.find(SkipContainer)).toHaveLength(1);
  });

  it('Should display skip icon if skipTime is false', () => {
    // Given
    const props = createDefaultProps({ isAdPlaying: true, seekPosition: skipTime + 2.3456 });

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BottomBar {...props} />
      </ThemeProvider>
    ).find(BottomBar);

    // Expect
    expect(wrapper.find(StyledSkipIcon)).toHaveLength(1);
    expect(wrapper.find(Spinner)).toHaveLength(0);
  });

  it('Should display skip timer if skipTime exists', () => {
    // Given
    const props = createDefaultProps({ isAdPlaying: true, seekPosition: skipTime - 1.5345 });

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BottomBar {...props} />
      </ThemeProvider>
    ).find(BottomBar);

    // Expect
    expect(wrapper.find(StyledSkipIcon)).toHaveLength(0);
    expect(wrapper.find(Spinner)).toHaveLength(1);
    expect(wrapper.find(SkipTimer).text()).toEqual('2');
  });

  it('Should not display skip timer if skipTime is bigger than skipTime', () => {
    // Given
    const props = createDefaultProps({ isAdPlaying: true, seekPosition: skipTime + 1 });

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BottomBar {...props} />
      </ThemeProvider>
    ).find(BottomBar);

    // Expect
    expect(wrapper.find(SkipTimer)).toHaveLength(0);
  });

  it('Should display SkipLabel with opacity when ad is not skippable', () => {
    // Given
    const props = createDefaultProps({ isAdPlaying: true, seekPosition: skipTime - 1.2345 });

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BottomBar {...props} />
      </ThemeProvider>
    ).find(BottomBar);

    // Expect
    expect(wrapper.find(SkipLabel)).toHaveStyleRule('opacity', '0.3');
  });

  it('Should display SkipLabel without opacity when ad is skippable', () => {
    // Given
    const props = createDefaultProps({ isAdPlaying: true, seekPosition: skipTime + 1.2345 });

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BottomBar {...props} />
      </ThemeProvider>
    ).find(BottomBar);

    // Expect
    expect(wrapper.find(SkipLabel)).toHaveStyleRule('opacity', '1');
  });

  it('Should trigger onSkipAd when clicking on skip button and ad skippable', () => {
    // Given
    const props = createDefaultProps({ isAdPlaying: true, seekPosition: skipTime + 1.2345 });

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BottomBar {...props} />
      </ThemeProvider>
    ).find(BottomBar);

    act(() => {
      wrapper.find(SkipContainer).simulate('click');
    });

    // Expect
    expect(props.onSkipAd).toHaveBeenCalled();
  });

  it('Should not trigger onSkipAd when clicking on skip button and ad not skippable', () => {
    // Given
    const props = createDefaultProps({ isAdPlaying: true, seekPosition: skipTime - 3.4567 });

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BottomBar {...props} />
      </ThemeProvider>
    ).find(BottomBar);

    act(() => {
      wrapper.find(SkipContainer).simulate('click');
    });

    // Expect
    expect(props.onSkipAd).not.toHaveBeenCalled();
  });
});
