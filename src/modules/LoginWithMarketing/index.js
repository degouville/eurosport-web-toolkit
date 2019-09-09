import React, { useState, useCallback } from 'react';
import styled, { css } from 'react-emotion';
import PropTypes from 'prop-types';

import CheckIcon from 'src/assets/red-check.svg';
import ESPlayerLogo from 'src/assets/eurosport-player-logo.component.svg';

import * as breakpoints from 'src/breakpoints';
import { coreNeutral9 } from 'src/colors';
import Button from 'src/elements/Button';
import { H2 } from 'src/typography';
import Login from '../Login';

const Title = styled(H2)`
  color: ${({ theme }) => theme.marketingChecklist.title.color};
  font-size: 24px;
  ${breakpoints.small(css`
    font-size: 30px;
  `)};
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.marketingChecklist.subtitle.color};
  line-height: 24px;
  margin-top: 14px;
  margin-bottom: 20px;
  ${breakpoints.large(css`
    margin-top: 0;
  `)};
`;

const CheckList = styled.ul`
  margin: 32px 0;
`;

const Check = styled.li`
  color: ${({ theme }) => theme.marketingChecklist.check.color};
  padding-left: 30px;
  font-size: 16px;
  margin-bottom: 8px;
  line-height: 1.5;
  list-style: none;
  background: url(${CheckIcon}) left 5px no-repeat;
`;

const MarketingContent = ({ title, subtitle, checklist }) => (
  <>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
    <CheckList>{checklist && checklist.map(check => <Check key={check}>{check}</Check>)}</CheckList>
  </>
);

MarketingContent.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  checklist: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const DefaultModalWrapper = styled.div`
  display: none;
  width: 100%;
  ${breakpoints.small(css`
    display: flex;
    flex-direction: column;
    margin: 37px 33px 40px;
  `)};
  ${breakpoints.medium(css`
    margin-top: 71px;
  `)};
  ${breakpoints.large(css`
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding: 0 calc(30vw - 277px);
    margin-top: 25vh;
  `)};
`;

const HalfContainer = styled.div`
  ${breakpoints.large(css`
    margin-right: auto;
    flex-grow: 1;
    flex-basis: 0;
  `)};
`;

const StyledESPlayerLogoDesktop = styled(ESPlayerLogo)`
  margin-bottom: 40px;
`;

const StyledSubscribeButton = styled(Button)`
  max-width: 222px;
  ${breakpoints.large(css`
    max-width: none;
  `)}
`;

const Separator = styled.div`
  border-bottom: solid 2px ${coreNeutral9};
  margin: 30px 0;
  ${breakpoints.large(css`
    border-right: solid 2px ${coreNeutral9};
    align-self: stretch;
    margin: 0 118px;
  `)}
`;

export const DefaultModal = ({ marketingMessages, subscribeUrl, subscribeText, ...loginProps }) => (
  <DefaultModalWrapper>
    <HalfContainer>
      <StyledESPlayerLogoDesktop />
      <MarketingContent {...marketingMessages} />
      <StyledSubscribeButton arrowType="arrow" href={subscribeUrl}>
        {subscribeText}
      </StyledSubscribeButton>
    </HalfContainer>
    <Separator />
    <HalfContainer>
      <Login
        isSecondaryMode
        showSubscribeSection={false}
        subscribeText={subscribeText}
        subscribeUrl=""
        {...loginProps}
      />
    </HalfContainer>
  </DefaultModalWrapper>
);

export const SignInButton = styled(Button)`
  margin-top: 16px;
`;

const MobileModalWrapper = styled.div`
  display: block;
  margin: 20px;
  ${breakpoints.small(css`
    display: none;
  `)}
`;

const MobileHeader = styled.div``;

const StyledESPlayerLogo = styled(ESPlayerLogo)`
  margin: auto;
  width: 100%;
  margin-bottom: 29px;
`;

export const MobileModal = ({ marketingMessages, subscribeUrl, subscribeText, signInText, ...loginProps }) => {
  const [isLoginScreen, setIsLoginScreen] = useState(false);
  const useSetIsLoginScreen = useCallback(() => {
    setIsLoginScreen(prevScreen => !prevScreen);
  }, [setIsLoginScreen]);

  return (
    <MobileModalWrapper>
      <MobileHeader>
        <StyledESPlayerLogo />
      </MobileHeader>
      {isLoginScreen ? (
        <Login subscribeText={subscribeText} subscribeUrl={subscribeUrl} signInText={signInText} {...loginProps} />
      ) : (
        <>
          <MarketingContent {...marketingMessages} />
          <Button arrowType="arrow" href={subscribeUrl}>
            {subscribeText}
          </Button>
          <SignInButton type="secondaryForm" arrowType="arrow" onClick={useSetIsLoginScreen}>
            {signInText}
          </SignInButton>
        </>
      )}
    </MobileModalWrapper>
  );
};

const LoginWithMarketing = props => (
  <>
    <DefaultModal {...props} />
    <MobileModal {...props} />
  </>
);

export default LoginWithMarketing;

const modalPropTypes = {
  marketingMessages: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    checklist: PropTypes.array,
  }).isRequired,
  subscribeUrl: PropTypes.string.isRequired,
  subscribeText: PropTypes.string.isRequired,
  signInText: PropTypes.string.isRequired,
};

MobileModal.propTypes = modalPropTypes;
DefaultModal.propTypes = modalPropTypes;
