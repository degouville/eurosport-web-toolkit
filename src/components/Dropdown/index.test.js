import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import Dropdown, { StyledArrow, StyledDropdown, StyledCheckMark, StyledLi } from '.';
import { dropdownOptions, initialOptionID } from './mock';

describe('Dropdown', () => {
  it('Renders Dropdown', () => {
    // Given
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Dropdown options={dropdownOptions} />
      </ThemeProvider>
    );

    // When
    const dropdown = wrapper.find(Dropdown);

    // Expect
    expect(dropdown).toMatchSnapshot();
    wrapper.unmount();
  });

  it('should display dropdown on click', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Dropdown options={dropdownOptions} />
      </ThemeProvider>
    );
    wrapper.find(StyledArrow).simulate('click');
    expect(wrapper.find(StyledDropdown)).toHaveStyleRule('display', 'block');
    wrapper.unmount();
  });

  it('should put forward selected option', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Dropdown options={dropdownOptions} />
      </ThemeProvider>
    );
    const isSelected = li => !!li.prop('isSelected');
    const selectedOption = wrapper.findWhere(isSelected);
    const { color: labelColor } = theme.dropdown.label;

    expect(selectedOption).toHaveStyleRule('color', labelColor);
    wrapper.unmount();
  });

  it('should display selected option from initial prop', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Dropdown options={dropdownOptions} initialOptionID={initialOptionID} />
      </ThemeProvider>
    );
    const isSelected = li => !!li.prop('isSelected');
    const selectedOption = wrapper.findWhere(isSelected);
    const selectedOptionText = selectedOption.text();
    expect(selectedOptionText).toBe('Roland Garros women doubles longer ✓');
    wrapper.unmount();
  });

  it('should display selected option after new selection', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Dropdown options={dropdownOptions} initialOptionID={initialOptionID} />
      </ThemeProvider>
    );

    wrapper
      .find(StyledLi)
      .at(2)
      .simulate('click');

    const isSelected = li => !!li.prop('isSelected');
    const selectedOption = wrapper.findWhere(isSelected);
    const selectedOptionText = selectedOption.text();
    expect(selectedOptionText).toBe('Men doubles ✓');
    wrapper.unmount();
  });

  it('should display the seleted option as label', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Dropdown options={dropdownOptions} />
      </ThemeProvider>
    );
    const isSelected = li => !!li.prop('isSelected');
    const selectedOption = wrapper.findWhere(isSelected);
    const hasCheckMark = selectedOption.contains(StyledCheckMark);
    expect(hasCheckMark).toBe(true);
    wrapper.unmount();
  });
});
