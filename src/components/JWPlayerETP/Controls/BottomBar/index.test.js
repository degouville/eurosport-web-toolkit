import React from 'react';
import { shallow } from 'enzyme';
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
    ...newProps,
  });

  it('Should match snapshot', () => {
    // Given
    const props = createDefaultProps();
    const wrapper = shallow(<BottomBar {...props} />);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });
});
