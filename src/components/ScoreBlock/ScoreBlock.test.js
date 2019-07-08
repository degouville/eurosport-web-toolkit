import React from 'react';
import { shallow, mount } from 'enzyme';
import greenCircleSVG from 'src/assets/green-circle.svg';
import crossSVG from 'src/assets/circle-with-cross.svg';
import { ScoreBlock, StyledButton } from './ScoreBlock';
import { liveMatchData, pastMatchData } from './mockData/mockScoreBlockData';

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
});
