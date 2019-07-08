import React from 'react';
import { shallow } from 'enzyme';
import Labels, { StyledLabelSimple, StyledLabel } from '.';
import { beforeEventLabels, liveEventLabels, afterEventLabels, simpleLabels } from './mockData/labels';

describe('Labels', () => {
  describe('when isSimpleMode', () => {
    it('renders <StyledLabelSimple /> component', () => {
      const wrapper = shallow(<Labels labels={simpleLabels} isSimpleMode />);
      expect(wrapper.find(StyledLabelSimple)).toHaveLength(simpleLabels.length);
    });

    it('renders labels in simple mode', () => {
      const labels = shallow(<Labels labels={simpleLabels} isSimpleMode />);
      expect(labels).toMatchSnapshot();
    });
  });

  describe('when default mode', () => {
    it('renders <StyledLabel /> component', () => {
      const wrapper = shallow(<Labels labels={simpleLabels} />);
      expect(wrapper.find(StyledLabel)).toHaveLength(simpleLabels.length);
    });

    it('renders labels before event', () => {
      const labels = shallow(<Labels labels={beforeEventLabels} />);
      expect(labels).toMatchSnapshot();
    });
    it('renders labels live event', () => {
      const labels = shallow(<Labels labels={liveEventLabels} />);
      expect(labels).toMatchSnapshot();
    });
    it('renders labels after event', () => {
      const labels = shallow(<Labels labels={afterEventLabels} />);
      expect(labels).toMatchSnapshot();
    });
  });
});
