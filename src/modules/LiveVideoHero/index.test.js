import React from 'react';
import { shallow } from 'enzyme';
import LiveVideoHero, { StyledBackground } from '.';
import { beforeEventLabels } from '../../elements/Labels/mockData/labels';
import PlayIcon from '../../elements/PlayIcon';

describe('Live Video Hero', () => {
  const makeProps = newProps => ({
    backgroundImageUrl: 'https://i.eurosport.com/taiga/MagicBox/Crop/16_9/0_20190612-103247.jpeg?w=1030',
    onPlayIconClick: () => null,
    labels: beforeEventLabels,
    title: 'Athletics: Marathon des Sables',
    programCallSign: 'E2NO',
    programDetails: '14:00 - 16:00',
    isPlayerLoading: false,
    videoPlayerMode: false,
    ...newProps,
  });

  it('should render as expected', () => {
    const wrapper = shallow(<LiveVideoHero {...makeProps()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("doesn't show PlayIcon and a background image if videoPlayerMode is true", () => {
    const wrapper = shallow(<LiveVideoHero {...makeProps({ videoPlayerMode: true })} />);
    expect(wrapper.find(PlayIcon)).toHaveLength(0);
    expect(wrapper.find(StyledBackground)).toHaveStyleRule('opacity', '0');
  });
});
