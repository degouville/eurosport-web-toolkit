import React from 'react';
import { shallow } from 'enzyme';
import BottomBar from './index';

describe('Components|JWPlayerETP|Controls|BottomBar', () => {
  const Component = () => <div id="children-to-display" />;

  const createDefaultProps = newProps => ({
    isLive: true,
    children: <Component />,
    rewindCounts: undefined,
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
