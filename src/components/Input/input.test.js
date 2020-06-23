import React from 'react';
import { shallow } from 'enzyme/build';
import Input, { InputText, ShowPasswordContainer, Placeholder } from './input.component';

describe('Input', () => {
  let wrapper;
  let onChange;

  beforeEach(() => {
    onChange = jest.fn();
  });

  it('Should match snapshot for text input', () => {
    // Given
    wrapper = shallow(<Input placeholder="Mail" type="text" value="test@es.com" onChange={onChange} />);

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('Should match snapshot for password input', () => {
    // Given
    wrapper = shallow(
      <Input placeholder="Password" type="password" value="mypassword" onChange={onChange} textButton="SHOW" />
    );

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  it('Should match snapshot for !hasLabelInside', () => {
    // Given
    wrapper = shallow(
      <Input
        placeholder="Password"
        type="password"
        value="mypassword"
        onChange={onChange}
        textButton="SHOW"
        hasLabelInside={false}
      />
    );

    // Expect
    expect(wrapper).toMatchSnapshot();
  });

  describe('Input Text', () => {
    const onFocus = wrp => wrp.find(InputText).prop('onFocus')();
    const onBlur = wrp => wrp.find(InputText).prop('onBlur')();

    it('Should set focused to true if we give a value by default', () => {
      // Given
      wrapper = shallow(<Input placeholder="Mail" type="text" value="test@es.com" onChange={onChange} />);

      // When
      const focused = wrapper.find(Placeholder).prop('focused');

      // Expect
      expect(focused).toBeTruthy();
    });

    it('Should set focused to false by default', () => {
      // Given
      wrapper = shallow(<Input placeholder="Mail" type="text" value="" onChange={onChange} />);

      // When
      const focused = wrapper.prop('focused');

      // Expect
      expect(focused).toBeFalsy();
    });

    it('Should set focused to true when we focus on the input', () => {
      // Given
      wrapper = shallow(<Input placeholder="Mail" type="text" value="" onChange={onChange} />);

      // When
      onFocus(wrapper);
      const focused = wrapper.find(Placeholder).prop('focused');

      // Expect
      expect(focused).toBeTruthy();
    });

    it('Should set focused to false when the text is empty on onBlur event', () => {
      // Given
      wrapper = shallow(<Input placeholder="Mail" type="text" value="" onChange={onChange} />);

      // When
      onFocus(wrapper);
      onBlur(wrapper);
      const focused = wrapper.prop('focused');

      // Expect
      expect(focused).toBeFalsy();
    });

    it('Should do nothing when the text is not empty on onBlur event', () => {
      // Given
      wrapper = shallow(<Input placeholder="Mail" type="text" value="test@eurosport.com" onChange={onChange} />);

      // When
      onBlur(wrapper);
      const focused = wrapper.find(Placeholder).prop('focused');

      // Expect
      expect(focused).toBeTruthy();
    });
  });

  describe('Password icon', () => {
    const onShowPasswordClick = wrp => wrp.find(ShowPasswordContainer).prop('onClick')();

    it('Should change inputType from password to text when onShowPasswordClick is trigger', () => {
      // Given
      wrapper = shallow(<Input placeholder="Password" type="password" value="secretvalue" onChange={onChange} />);

      // When
      onShowPasswordClick(wrapper);
      const inputType = wrapper.find(InputText).prop('type');

      // Expect
      expect(inputType).toBe('text');
    });

    it('Should change inputType from text to password when onShowPasswordClick is trigger', () => {
      // Given
      wrapper = shallow(<Input placeholder="Password" type="password" value="secretvalue" onChange={onChange} />);

      // When
      onShowPasswordClick(wrapper);
      onShowPasswordClick(wrapper);
      const inputType = wrapper.find(InputText).prop('type');

      // Expect
      expect(inputType).toBe('password');
    });

    it('Should show icon on type password', () => {
      // Given
      wrapper = shallow(<Input placeholder="Password" type="password" value="secretvalue" onChange={onChange} />);

      // When
      const elements = wrapper.find(ShowPasswordContainer);

      // Expect
      expect(elements.length).toEqual(1);
    });

    it('Should not show icon on type text', () => {
      // Given
      wrapper = shallow(<Input placeholder="Email" type="text" value="value" onChange={onChange} />);

      // When
      const elements = wrapper.find(ShowPasswordContainer);

      // Expect
      expect(elements.length).toEqual(0);
    });
  });
});
