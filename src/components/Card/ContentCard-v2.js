import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import LinesEllipsis from 'react-lines-ellipsis';
import LinesEllipsisResponsive from 'react-lines-ellipsis/lib/responsiveHOC';
import { coreLightMinus1, coreNeutral3, coreNeutral10, coreLightBase, coreNeutral4 } from '../../colors';
import * as breakpoints from '../../breakpoints';
import { fontAlphaHeadline, fontInterUi, H2 } from '../../typography';
import Link from '../../elements/Link';
import PlayIconLink from '../../elements/PlayIconLink';

const ResponsiveEllipsis = LinesEllipsisResponsive()(LinesEllipsis);

const LinkCard = styled(Link)`
  overflow: hidden;
  position: relative;
  display: block;
`;

const DivImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${coreNeutral10};
`;

const SpanBottomOverlay = styled.span`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  left: -10%;
  background-color: ${coreNeutral10};
  top: calc(100% - 65px);
  transform-origin: top left;
  transform: scale(1.3) rotate(-2.6deg);
`;

export const Image = styled.div`
  width: 100%;
  z-index: 1;
  height: 100%;
  background: linear-gradient(
      rgba(0, 0, 0, ${props => props.darkness / 100}),
      rgba(0, 0, 0, ${props => props.darkness / 100})
    ),
    url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const SpanImageOverlay = styled.span`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.25;
  background: radial-gradient(
    circle,
    rgba(4, 5, 15, 0) 0%,
    rgba(4, 5, 15, 0.06) 5.72%,
    rgba(4, 5, 15, 0.12) 12.1%,
    rgba(4, 5, 15, 0.19) 19.02%,
    rgba(4, 5, 15, 0.26) 26.38%,
    rgba(4, 5, 15, 0.34) 34.07%,
    rgba(4, 5, 15, 0.42) 41.98%,
    rgba(4, 5, 15, 0.5) 50%,
    rgba(4, 5, 15, 0.58) 58.02%,
    rgba(4, 5, 15, 0.66) 65.93%,
    rgba(4, 5, 15, 0.74) 73.62%,
    rgba(4, 5, 15, 0.81) 80.98%,
    rgba(4, 5, 15, 0.88) 87.9%,
    rgba(4, 5, 15, 0.94) 94.28%,
    #04050f 100%
  );
`;

const DivCardContent = styled.div`
  position: relative;
  z-index: 5;
  height: 100%;
`;

const DivTopic = styled.div`
  text-decoration: none;
  display: inline-block;
  ${fontInterUi};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  line-height: 18px;
`;

const Title = styled(H2)`
  color: ${coreLightMinus1};
  ${fontAlphaHeadline};
  font-weight: normal;
`;

const DivDescription = styled.div`
  ${fontInterUi};
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 18px;
`;

const DivTextWrapper = styled.div`
  position: absolute;
`;

export const SpanTimeLabel = styled.span`
  position: absolute;
  color: ${coreNeutral4};
  ${fontInterUi};
  font-size: 12px;
  letter-spacing: 1px;
`;

const mobileStyles = `
  height: 387px;

  ${SpanBottomOverlay}, ${Image} {
    height: 50%;
  }

  ${DivTopic} {
    margin: 0 24px;
    color: ${coreNeutral3};
  }

  ${Title} {
    color: ${coreLightBase};
    margin: 11.5px 24px 0 24px;
    ${fontInterUi};
    font-size: 16px;
    line-height: 24px;
  }

  ${DivDescription} {
    margin: 9px 24px 0 24px;
    color: ${coreNeutral3};
  }

  ${SpanTimeLabel} {
    bottom: 24px;
    left: 24px;
  }

  ${PlayIconLink} {
    bottom: 190px;
    right: 0;
  }

  ${SpanBottomOverlay} {
    top: calc(100% - 200px);
  }

  ${DivTextWrapper} {
    top: 211px;
    bottom: auto;
  }
`;

const tabletStyles = `
  height: 352px;
  
  ${DivTextWrapper} {
    top: 185px;
  }
`;

const desktopStyles = `
  height: 378px;

  ${SpanBottomOverlay}, ${Image} {
    height: 86%;
  }

  ${DivTopic} {
    margin: 0 42px;
    color: ${coreLightBase};
  }

  ${Title} {
    font-size: 28px;
    line-height: 36px;
    margin: 14px 40px 0 40px;

    ${breakpoints.large(`
      font-size: 28px;
      line-height: 36px;
    `)};
  }

  ${DivDescription} {
    margin: 16px 42px 0 42px;
    color: ${coreLightBase};
    text-transform: uppercase;
  }

  ${PlayIconLink} {
    bottom: 71px;
    right: 0;
  }

  ${SpanBottomOverlay} {
    top: calc(100% - 57px);
  }

  ${DivTextWrapper} {
    top: auto;
    bottom: 99px;
  }

  ${SpanTimeLabel} {
    bottom: 28px;
    left: 42px;
  }
`;

const BaseCard = styled(props => (
  <LinkCard className={props.className} target={props.target} href={props.link} data-test="contentCardv2">
    <DivImageContainer>
      {props.image && <Image src={props.image} alt={props.title} darkness={props.darkness} />}
      <SpanImageOverlay />
      <SpanBottomOverlay />
    </DivImageContainer>
    <DivCardContent>
      {props.labelPlayButton && <PlayIconLink>{props.labelPlayButton}</PlayIconLink>}
      <DivTextWrapper>
        <DivTopic>{props.topic}</DivTopic>
        <Title>
          <ResponsiveEllipsis text={props.title} maxLine={3} ellipsis="..." trimRight basedOn="letters" />
        </Title>
        <DivDescription>{props.description}</DivDescription>
      </DivTextWrapper>

      {props.children}
    </DivCardContent>
  </LinkCard>
))`
  text-decoration: none;
`;

BaseCard.propTypes = {
  image: PropTypes.string.isRequired,
  topic: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  labelPlayButton: PropTypes.string,
  darkness: PropTypes.number,
};

BaseCard.defaultProps = {
  image: null,
  topic: '',
  title: '',
  description: '',
  darkness: 0,
};

export const CardBig = styled(BaseCard)`
  ${mobileStyles}

  ${breakpoints.medium(`
    ${desktopStyles}
  `)};
`;

export const CardSmall = styled(BaseCard)`
  ${mobileStyles}

  ${breakpoints.medium(`
    ${tabletStyles}
  `)};

  ${breakpoints.large(`
    height: 378px;

    ${DivTextWrapper} {
      top: 211px;
    }
  `)};
`;
