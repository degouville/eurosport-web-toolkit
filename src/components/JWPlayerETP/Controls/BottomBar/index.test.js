import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from 'src/theme';
import { BottomBar } from './index';

describe('Components|JWPlayerETP|Controls|BottomBar', () => {
  const Component = () => <div id="children-to-display" />;

  const createDefaultProps = newProps => ({
    isLive: true,
    children: <Component />,
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
});
