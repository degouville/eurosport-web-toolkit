import React from 'react';
import { shallow, mount } from 'enzyme';
import greenCircleSVG from 'src/assets/green-circle.svg';
import crossSVG from 'src/assets/circle-with-cross.svg';
import { ThemeProvider } from 'emotion-theming';
import { ScoreBlock, StyledButton } from './ScoreBlock';
import { SetsSchedule } from './SetsSchedule';
import { scheduledMatchDataSet, liveMatchData, pastMatchData } from './mockData/mockScoreBlockData';
import theme from '../../theme';

describe('<ScoreBlock />', () => {
  it('Renders a ScoreBlock component with expected snapshot', () => {
    const wrapper = shallow(
      <ScoreBlock data={pastMatchData} matchUrl="www.eurosport.fr" isWatchable isLive t={key => key} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should display '->' if isLive", () => {
    const wrapper = mount(
      <ScoreBlock isLive data={liveMatchData} matchUrl="www.google.fr" isWatchable={false} t={key => key} />
    );
    const styledButton = wrapper.find(StyledButton);
    expect(styledButton).toHaveStyleRule('content', "'\u2192'");
  });

  it('should display a green circle if displayLeftCircle is set to won', () => {
    const wrapper = mount(
      <ScoreBlock
        isLive
        data={liveMatchData}
        matchUrl="www.google.fr"
        isWatchable={false}
        displayLeftCircle="won"
        t={key => key}
      />
    );

    const greenCircle = wrapper.find('[alt="won match icon"]');
    expect(greenCircle.exists()).toBe(true);
    expect(greenCircle.prop('src')).toEqual(greenCircleSVG);
  });

  it('should display a grey circle with cross if displayLeftCircle is set to lost', () => {
    const wrapper = mount(
      <ScoreBlock
        isLive
        data={liveMatchData}
        matchUrl="www.google.fr"
        isWatchable={false}
        displayLeftCircle="lost"
        t={key => key}
      />
    );
    const circle = wrapper.find('[alt="lost match icon"]');
    expect(circle.exists()).toBe(true);
    expect(circle.prop('src')).toEqual(crossSVG);
  });

  it('should display schedule if has schedule data', () => {
    const { players, schedule } = scheduledMatchDataSet;
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ScoreBlock
          data={players}
          schedule={schedule}
          matchUrl="www.google.fr"
          isLive={false}
          isWatchable={false}
          displayLeftCircle="lost"
          t={key => key}
        />
      </ThemeProvider>
    );
    const setsSchedule = wrapper.find(SetsSchedule);
    expect(setsSchedule.exists()).toBe(true);
  });

  it('should NOT display schedule if has no schedule data', () => {
    const { players } = scheduledMatchDataSet;
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ScoreBlock
          data={players}
          matchUrl="www.google.fr"
          isLive={false}
          isWatchable={false}
          displayLeftCircle="lost"
          t={key => key}
        />
      </ThemeProvider>
    );
    const setsSchedule = wrapper.find(SetsSchedule);
    expect(setsSchedule.exists()).toBe(false);
  });

  it('should NOT display schedule if has Sets', () => {
    const { schedule } = scheduledMatchDataSet;
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ScoreBlock
          isScheduled
          data={liveMatchData}
          schedule={schedule}
          matchUrl="www.google.fr"
          isLive
          isWatchable={false}
          displayLeftCircle="lost"
          t={key => key}
        />
      </ThemeProvider>
    );
    const setsSchedule = wrapper.find(SetsSchedule);
    expect(setsSchedule.exists()).toBe(false);
  });

  it('should not diplay the call to actions if hasButton is false', () => {
    const wrapper = mount(
      <ScoreBlock
        hasButton={false}
        isLive
        data={liveMatchData}
        matchUrl="www.google.fr"
        isWatchable={false}
        t={key => key}
      />
    );
    expect(wrapper.find(StyledButton)).toHaveLength(0);
  });
});
