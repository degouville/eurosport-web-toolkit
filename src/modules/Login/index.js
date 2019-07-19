import React, { useState, useCallback } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import Input from 'src/components/Input/input.component';
import ErrorBanner from 'src/elements/ErrorBanner';
import Button from 'src/elements/Button';
import ArrowLink from 'src/elements/ArrowLink';
import UnderlineLink from 'src/elements/UnderlineLink';

const Login = ({
  onSubmit,
  forgotPasswordUrl,
  forgotPasswordText,
  subscribeUrl,
  subscribeText,
  needHelpText,
  needHelpUrl,
  callToActionText,
  passwordPlaceholder,
  emailPlaceholder,
  signInText,
  showPasswordText,
  title,
  errorMessage,
}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onEmailChange = useCallback(({ target }) => setEmail(target.value), [setEmail]);
  const onPasswordChange = useCallback(({ target }) => setPassword(target.value), [setPassword]);
  const onSignInSubmit = useCallback(() => onSubmit({ email, password }), [email, onSubmit, password]);

  const onFormSubmit = useCallback(
    event => {
      event.preventDefault();
      onSubmit({ email, password });
    },
    [email, onSubmit, password]
  );

  return (
    <FormContainer onSubmit={onFormSubmit}>
      <Title>{title}</Title>
      {errorMessage && (
        <ComponentContainer>
          <ErrorBanner message={errorMessage} />
        </ComponentContainer>
      )}
      <ComponentContainer>
        <Input value={email} onChange={onEmailChange} placeholder={emailPlaceholder} />
      </ComponentContainer>
      <ComponentContainer>
        <Input
          value={password}
          onChange={onPasswordChange}
          placeholder={passwordPlaceholder}
          type="password"
          textButton={showPasswordText}
        />
      </ComponentContainer>
      <ComponentContainer>
        <Button type="form" onClick={onSignInSubmit}>
          {signInText}
        </Button>
        <InvisibleSubmit type="submit" />
      </ComponentContainer>
      <ActionLinkContainer>
        <UnderlineLink href={forgotPasswordUrl}>{forgotPasswordText}</UnderlineLink>
        <LinkSeparator />
        <UnderlineLink href={needHelpUrl}>{needHelpText}</UnderlineLink>
      </ActionLinkContainer>
      <Separator />
      <CallToActionContainer>
        <Text>{callToActionText}</Text>
        <ArrowLink href={subscribeUrl}>{subscribeText}</ArrowLink>
      </CallToActionContainer>
    </FormContainer>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  forgotPasswordText: PropTypes.string.isRequired,
  forgotPasswordUrl: PropTypes.string.isRequired,
  subscribeText: PropTypes.string.isRequired,
  subscribeUrl: PropTypes.string.isRequired,
  needHelpText: PropTypes.string.isRequired,
  needHelpUrl: PropTypes.string.isRequired,
  callToActionText: PropTypes.string.isRequired,
  passwordPlaceholder: PropTypes.string.isRequired,
  emailPlaceholder: PropTypes.string.isRequired,
  signInText: PropTypes.string.isRequired,
  showPasswordText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

Login.defaultProps = {
  errorMessage: undefined,
};

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ComponentContainer = styled.div`
  margin-top: 8px;
`;

const ActionLinkContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const LinkSeparator = styled.div`
  box-sizing: border-box;
  margin-left: 16px;
  margin-right: 16px;
  width: 1px;
  height: 24px;
  border: 1px solid ${({ theme }) => theme.login.separator.secondary};
`;

const Separator = styled.div`
  height: 1px;
  margin-top: 32px;
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.login.separator.primary};
  opacity: 0.15;
`;

const CallToActionContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Text = styled.p`
  height: 24px;
  color: ${({ theme }) => theme.login.text.color};
  font-family: ${({ theme }) => theme.login.text.fontFamily};
  font-size: 16px;
  line-height: 24px;
  margin-right: 8px;
`;

const Title = styled.h1`
  height: 56px;
  color: ${({ theme }) => theme.login.title.color};
  font-family: ${({ theme }) => theme.login.title.fontFamily};
  font-size: 48px;
  line-height: 56px;
  margin-bottom: 32px;
`;

export const InvisibleSubmit = styled.input`
  display: none;
`;

export default Login;
