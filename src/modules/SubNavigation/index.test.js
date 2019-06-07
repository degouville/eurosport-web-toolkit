import React from 'react';
import { shallow } from 'enzyme';
import SubNavigation, { StyledNavWrapper, StyledShopIcon } from '.';
import { items } from './index.stories';

describe('SubNavigation', () => {
  it('renders when everything passed in', () => {
    expect(shallow(<SubNavigation items={items} />)).toMatchSnapshot();
  });

  it('should allow extra attibutes to be passed to an item link (eg for analytics to hook into)', () => {
    const itemWithExtraAttibute = [
      {
        name: 'Home',
        linkProps: {
          href: '/home',
          'data-adobe-analytics': 'an-adobe-analytics-value',
        },
      },
    ];

    const component = shallow(<SubNavigation items={itemWithExtraAttibute} />);
    const itemLink = component.find({ href: '/home' });

    expect(itemLink.props()).toHaveProperty('data-adobe-analytics', 'an-adobe-analytics-value');
  });

  it('should add extra props passed to the component SubNavigation', () => {
    const component = shallow(<SubNavigation items={items} answer="42" />);
    expect(component.find(StyledNavWrapper).props()).toHaveProperty('answer', '42');
  });

  it('does not display a shop icon when not passed among the items', () => {
    const itemsWithoutShop = [
      {
        name: 'Home',
        linkProps: {
          href: '/home',
        },
        type: 'home',
      },
    ];
    const component = shallow(<SubNavigation items={itemsWithoutShop} />);
    expect(component.find(StyledShopIcon)).toHaveLength(0);
  });
});
