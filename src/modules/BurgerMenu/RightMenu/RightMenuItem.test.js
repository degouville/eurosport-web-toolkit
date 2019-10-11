import React from 'react';
import { shallow } from 'enzyme';
import RightMenuItem, { StyledItemLink } from './RightMenuItem';
import * as types from './sectionTypes';

describe('RightMenuItem', () => {
  describe('Snapshot testing', () => {
    it('renders with expected snapshot for mobile', () => {
      expect(
        shallow(
          <RightMenuItem
            isMobileMenu
            item={{ id: 1, name: 'foo', sections: [] }}
            key={1}
            onMenuSelected={jest.fn()}
            selectedMenuId={2}
          />
        )
      ).toMatchSnapshot();
    });

    it('renders with expected snapshot for desktop', () => {
      expect(
        shallow(
          <RightMenuItem
            isMobileMenu={false}
            item={{ id: 1, name: 'foo', sections: [] }}
            key={1}
            onMenuSelected={jest.fn()}
            selectedMenuId={2}
          />
        )
      ).toMatchSnapshot();
    });
  });

  it('should call onMenuSelected callback when clicked', () => {
    // Given
    const onSubMenuOpenCallback = jest.fn();
    const wrapper = shallow(
      <RightMenuItem
        isMobileMenu
        item={{ id: 1, items: [{}], name: 'foo', sections: [] }}
        key={1}
        menuType={types.MENU.SPORTS}
        onSubMenuOpen={onSubMenuOpenCallback}
        selectedMenuId={2}
      />
    );
    const styledItemLink = wrapper.find(StyledItemLink);

    // When
    styledItemLink.simulate('click', new Event('click'));

    // Expect
    expect(onSubMenuOpenCallback).toHaveBeenCalled();
  });
});
