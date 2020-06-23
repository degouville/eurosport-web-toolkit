import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled, { css } from 'react-emotion';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';
import Input from 'src/components/Input/input.component';
import ErrorBanner from 'src/elements/ErrorBanner';
import Button from 'src/elements/Button';
import ArrowLink from 'src/elements/ArrowLink';
import UnderlineLink from 'src/elements/UnderlineLink';
import { small, medium, large } from 'src/breakpoints';

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
  showSubscribeSection,
  isSecondaryMode,
  recaptchaSiteKey,
}) => {
  const recaptchaRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    emailRef.current = email;
    passwordRef.current = password;
  });

  const [isRecaptchaLoaded, setisRecaptchaLoaded] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleSubmit = useCallback(
    event => {
      event && event.preventDefault();
      if (recaptchaToken !== null) {
        recaptchaRef.current.reset();
        setRecaptchaToken(null);
      }
      isRecaptchaLoaded && recaptchaRef.current.execute();
    },
    [recaptchaToken, isRecaptchaLoaded, recaptchaRef, setRecaptchaToken]
  );

  const onSignInSubmit = useCallback(() => handleSubmit(), [handleSubmit]);

  const onFormSubmit = useCallback(event => handleSubmit(event), [handleSubmit]);

  const onRecaptchaChange = useCallback(
    token => {
      setRecaptchaToken(token);
      if (token !== null) {
        onSubmit({ email: emailRef.current, password: passwordRef.current, recaptchaToken: token });
      }
    },
    [setRecaptchaToken, onSubmit]
  );

  const asyncRecaptchaOnLoad = useCallback(() => {
    setisRecaptchaLoaded(true);
  }, [setisRecaptchaLoaded]);

  const onEmailChange = useCallback(({ target }) => setEmail(target.value), [setEmail]);
  const onPasswordChange = useCallback(({ target }) => setPassword(target.value), [setPassword]);

  return (
    <FormContainer onSubmit={onFormSubmit}>
      <Title>{title}</Title>
      {errorMessage && (
        <ComponentContainer>
          <ErrorBanner message={errorMessage} />
        </ComponentContainer>
      )}
      <InputsContainer>
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
          <Button
            type={isSecondaryMode ? 'secondaryForm' : 'form'}
            onClick={onSignInSubmit}
            arrowType="arrow"
            tabIndex="0"
          >
            {signInText}
          </Button>
          <InvisibleSubmit type="submit" />
          {recaptchaSiteKey && (
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={recaptchaSiteKey}
              theme="dark"
              onChange={onRecaptchaChange}
              asyncScriptOnLoad={asyncRecaptchaOnLoad}
            />
          )}
        </ComponentContainer>
      </InputsContainer>
      <ActionLinkContainer>
        <UnderlineLink href={forgotPasswordUrl}>{forgotPasswordText}</UnderlineLink>
        <LinkSeparator />
        <UnderlineLink href={needHelpUrl}>{needHelpText}</UnderlineLink>
      </ActionLinkContainer>
      {showSubscribeSection && (
        <>
          <Separator />
          <CallToActionContainer>
            <Text>{callToActionText}</Text>
            <ArrowLink href={subscribeUrl}>{subscribeText}</ArrowLink>
          </CallToActionContainer>
        </>
      )}
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
  showSubscribeSection: PropTypes.bool,
  isSecondaryMode: PropTypes.bool,
  recaptchaSiteKey: PropTypes.string,
};

Login.defaultProps = {
  errorMessage: undefined,
  showSubscribeSection: true,
  isSecondaryMode: false,
  recaptchaSiteKey: '',
};

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${large(css`
    max-width: 500px;
  `)};
`;

const ComponentContainer = styled.div`
  margin-top: 28px;
`;

const InputsContainer = styled.div`
  ${medium(css`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    grid-column-gap: 16px;
    align-items: end;
  `)}
  ${large(css`
    display: block;
  `)};
`;

const ActionLinkContainer = styled.div`
  margin-top: 28px;
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

export const CallToActionContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Text = styled.p`
  height: 24px;
  color: ${({ theme }) => theme.login.text.color};
  ${({ theme }) => theme.login.text.fontFamily}
  font-size: 16px;
  line-height: 24px;
  margin-right: 8px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.login.title.color};
  ${({ theme }) => theme.login.title.fontFamily}
  font-size: 24px;
  line-height: 32px;
  ${small(css`
    font-size: 30px;
  `)};
  ${medium(css`
    line-height: 36px;
  `)};
`;

export const InvisibleSubmit = styled.input`
  display: none;
`;

export default Login;
