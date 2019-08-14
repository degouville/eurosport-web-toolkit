import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import SetsSchedule from './SetsSchedule';
import { scheduledMatchDataSet } from './mockData/mockScoreBlockData';

const { players, schedule } = scheduledMatchDataSet;

describe('<SetsSchedule />', () => {
  it('Renders a SetsSchedule component', () => {
    // GIVEN
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <SetsSchedule data={players} schedule={schedule} />
      </ThemeProvider>
    );

    // EXPECT
    expect(wrapper.find(SetsSchedule)).toMatchSnapshot();

    wrapper.unmount();
  });
});
