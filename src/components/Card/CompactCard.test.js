import React from 'react';
import { shallow } from 'enzyme';

import CompactCard, { StyledImage } from './CompactCard';

const mockCardData = {
  img: 'https://i.eurosport.com/2018/10/29/2450727-50913270-2560-1440.jpg?w=200',
  category: 'Tennis',
  title: 'Youth olympic summer games',
  description: 'Description',
  timestamp: '09:00 - 10:30',
  channel: 'E1',
};

const mockIcon = <div />;

describe('Compact card', () => {
  it('Renders a Compact card', () => {
    const wrapper = shallow(<CompactCard card={mockCardData} icon={mockIcon} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should add extra props passed to the component', () => {
    const component = shallow(<CompactCard card={mockCardData} icon={mockIcon} data-test="test-card" />);
    expect(component.props()).toHaveProperty('data-test', 'test-card');
  });

  it('Renders no wrapping link if no url passed in', () => {
    const wrapper = shallow(<CompactCard card={mockCardData} icon={mockIcon} />);
    expect(wrapper.props().href).toBeFalsy();
  });

  it('Renders a link if a url is passed in', () => {
    const mockCard = {
      ...mockCardData,
      url: 'http://test.com',
    };
    const wrapper = shallow(<CompactCard card={mockCard} icon={mockIcon} />);

    expect(wrapper.render().attr('href')).toEqual('http://test.com');
    expect(wrapper.render().is('a')).toEqual(true);
  });

  it('should render image', () => {
    const wrapper = shallow(<CompactCard card={mockCardData} icon={mockIcon} />);
    expect(wrapper.dive().find(StyledImage).length).toEqual(1);
  });

  it('should render placeholder if no image provided', () => {
    // GIVEN
    const wrapper = shallow(<CompactCard card={mockCardData} icon={mockIcon} image={null} />);

    // WHEN
    const images = wrapper.dive().find(StyledImage);
    const { img: imageSrc } = images.first().props();

    // EXPECT
    expect(images.length).toEqual(1);
    expect(imageSrc).toContain('https://i.eurosport.com/2018/10/29/2450727-50913270-2560-1440.jpg?w=200');
  });
});
