import React from 'react';
import { shallow } from 'enzyme';
import LeftMenuItem, { StyledItemLink } from './LeftMenuItem';

describe('LeftMenuItem', () => {
  describe('Snapshot testing', () => {
    it('renders with expected snapshot for mobile', () => {
      expect(
        shallow(
          <LeftMenuItem
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
          <LeftMenuItem
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
    const onMenuSelectedCallback = jest.fn();
    const wrapper = shallow(
      <LeftMenuItem
        isMobileMenu
        item={{ id: 1, name: 'foo', sections: [] }}
        key={1}
        onMenuSelected={onMenuSelectedCallback}
        selectedMenuId={2}
      />
    );
    const styledItemLink = wrapper.find(StyledItemLink);

    // When
    styledItemLink.simulate('click', new Event('click'));

    // Expect
    expect(onMenuSelectedCallback).toHaveBeenCalled();
  });
});
