import React from 'react';
import { shallow } from 'enzyme';
import SubNavigation from '.';

const items = [
  {
    label: 'Home',
    linkProps: {
      href: '/',
    },
  },
  {
    label: 'Watch',
    linkProps: {
      href: '/watch',
    },
  },
  {
    label: 'What is Eurosport?',
    linkProps: {
      href: '/what',
    },
  },
  {
    label: 'Log in',
    linkProps: {
      href: '/login',
    },
  },
];

describe('SubNavigation', () => {
  it('renders when everything passed in', () => {
    expect(shallow(<SubNavigation items={items} />)).toMatchSnapshot();
  });

  it('should allow extra attibutes to be passed to an item link (eg for analytics to hook into)', () => {
    const itemWithExtraAttibute = [
      {
        label: 'Home',
        linkProps: {
          href: '/',
          'data-adobe-analytics': 'an-adobe-analytics-value',
        },
      },
    ];

    const component = shallow(<SubNavigation items={itemWithExtraAttibute} />);
    const itemLink = component.find({ children: 'Home' });

    expect(itemLink.props()).toHaveProperty('data-adobe-analytics', 'an-adobe-analytics-value');
  });

  it('should add extra props passed to the component SubNavigation', () => {
    const component = shallow(<SubNavigation items={items} answer="42" />);
    expect(component.props()).toHaveProperty('answer', '42');
  });
});
