import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Eye from 'src/assets/eye.component.svg';

const INPUT_TEXT = 'text';
const INPUT_PASSWORD = 'password';

const Input = ({ placeholder, type, value, onChange, textButton, hasLabelInside }) => {
  const [inputType, setInputType] = useState(type);
  const [focused, setFocused] = useState(value !== '');

  const onBlur = useCallback(() => value === '' && setFocused(false), [value, setFocused]);
  const onFocus = useCallback(() => setFocused(true), [setFocused]);
  const onShowPasswordClick = useCallback(
    () => (inputType === INPUT_PASSWORD ? setInputType(INPUT_TEXT) : setInputType(INPUT_PASSWORD)),
    [inputType, setInputType]
  );

  const showPasswordEnabled = inputType === INPUT_PASSWORD;

  return (
    <>
      {!hasLabelInside && (
        <Placeholder focused={focused} hasLabelInside={hasLabelInside}>
          {placeholder}
        </Placeholder>
      )}
      <MainContainer focused={focused}>
        <InputContainer focused={focused} hasLabelInside={hasLabelInside}>
          {hasLabelInside && (
            <Placeholder focused={focused} hasLabelInside={hasLabelInside}>
              {placeholder}
            </Placeholder>
          )}
          <InputText
            type={inputType}
            focused={focused}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            hasLabelInside={hasLabelInside}
          />
        </InputContainer>
        {type === INPUT_PASSWORD && (
          <ShowPasswordContainer active={showPasswordEnabled} onClick={onShowPasswordClick}>
            <Text>{textButton}</Text>
            <Icon />
          </ShowPasswordContainer>
        )}
      </MainContainer>
    </>
  );
};

Input.defaultProps = {
  placeholder: '',
  type: INPUT_TEXT,
  textButton: '',
  hasLabelInside: false,
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  textButton: PropTypes.string,
  hasLabelInside: PropTypes.bool,
};

const Icon = styled(Eye)`
  margin-right: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 250ms ease;
`;

const Text = styled.p`
  margin-right: 8px;
  margin-left: 8px;
  height: 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 14px;
  text-align: right;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 250ms ease;
`;

export const ShowPasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${Icon} {
    fill: ${({ active, theme }) => (!active ? theme.input.borderFocused : theme.input.border)};
  }

  ${Text} {
    color: ${({ active, theme }) => (!active ? theme.input.borderFocused : theme.input.border)};
    font-family: ${({ theme }) => theme.input.placeholder.fontFamily};
  }

  &:hover ${Icon} {
    fill: ${({ theme }) => theme.input.borderFocused};
  }

  &:hover ${Text} {
    color: ${({ theme }) => theme.input.borderFocused};
  }

  transition: all 250ms ease;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ focused, theme }) => (focused ? theme.input.borderFocused : theme.input.border)};
  transition: all 250ms ease;
  margin-top: ${props => (props.hasLabelInside ? '0' : '13px')};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.input.backgroundColor};
`;

const InputContainer = styled.div`
  ${props => (props.hasLabelInside ? 'height: 72px' : 'height: 48px')};
  display: flex;
  flex: 1;
  flex-direction: column;
  ${({ focused }) => !focused && `justify-content: center;`}
  transition: all 250ms ease;
`;

export const Placeholder = styled.label`
  position: ${props => (props.hasLabelInside ? 'absolute' : 'static')};
  user-select: none;
  margin-left: ${props => (props.hasLabelInside ? '24px' : '0')};
  margin-right: 24px;
  ${({ focused }) => focused && `margin-top: 18px;`}
  height: 14px;
  color: ${({ theme }) => theme.input.placeholder.color};
  font-family: ${({ theme }) => theme.input.placeholder.fontFamily};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 14px;
  text-transform: uppercase;
`;

export const InputText = styled.input`
  ${({ focused, hasLabelInside }) => focused && (hasLabelInside ? `margin-top: 34px;` : `margin-top: 12px;`)}
  position: relative;
  outline: 0;
  border: 0;
  border: none;
  padding: 0;
  text-decoration: none;
  background-color: transparent;
  height: 24px;
  color: ${({ theme }) => theme.input.text.color};
  font-family: ${({ theme }) => theme.input.text.fontFamily};
  font-size: 16px;
  line-height: 24px;

  // NOTE: FIX for android smartphone only
  width: 90%;
  margin: 10px;

  @media (min-width: 375px) {
    width: unset;
    margin: 0 24px 13px 24px;
  }
`;

export default Input;
