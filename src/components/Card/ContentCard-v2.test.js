import React from 'react';
import { shallow, mount } from 'enzyme';
import PlayIconLink from '../../elements/PlayIconLink';

import { CardBig, CardSmall, Image } from './ContentCard-v2';

const cardData = {
  image: 'https://i.eurosport.com/2019/04/21/2570541-53309530-2560-1440.jpg?w=800',
  topic: 'Australian Open',
  link: 'https://www.eurosport.fr',
  title: 'Re-Play of the Day: The craziest moments',
  description: 'Roland-garros',
  labelPlayButton: 'Replay',
  darkness: 50,
};

describe('Content card v2', () => {
  it('renders Card with Play Button', () => {
    expect(shallow(<CardBig {...cardData} />)).toMatchSnapshot();
    expect(shallow(<CardSmall {...cardData} />)).toMatchSnapshot();
  });

  it('renders Card without Play Button', () => {
    expect(
      shallow(<CardBig {...cardData} labelPlayButton={undefined} />)
        .dive()
        .find(PlayIconLink).length
    ).toBe(0);
    expect(
      shallow(<CardSmall {...cardData} labelPlayButton={undefined} />)
        .dive()
        .find(PlayIconLink).length
    ).toBe(0);
  });

  it('should render image', () => {
    const wrapper = mount(<CardBig {...cardData} />);
    expect(wrapper.find(Image).length).toEqual(1);
  });

  it('should render placeholder if no image provided', () => {
    // GIVEN
    const wrapper = shallow(<CardBig {...cardData} image={null} />);

    // WHEN
    const images = wrapper.dive().find(Image);
    const { src: imageSrc } = images.first().props();

    // EXPECT
    expect(images.length).toEqual(1);
    expect(imageSrc).toContain('/eurosport-web-toolkit/');
  });
});
