import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import get from 'lodash/get';
import { medium, large, wide } from '../../breakpoints';
import { jungleMist, halfBaked, turquoiseBlue, coreLightMinus1 } from '../../colors';
import { fontAlphaHeadline } from '../../typography';

import Cards from '../../components/Card';
import SharedLink, { SharedLinkShape } from './SharedLink';

export const StyledComment = styled.div`
  margin-top: 50px;
  display: flex;
`;
const StyledCommentLeft = styled.div`
  flex-shrink: 0;
  text-align: center;
  color: ${turquoiseBlue};
  font-size: 10px;
  font-weight: bold;
  width: 32px;
  margin-right: 20px;

  ${large(css`
    font-size: 12px;
    width: 42px;
  `)}

  ${wide(css`
    width: 62px;
  `)}
`;
const StyledCommentRight = styled.div`
  flex: 1;
  overflow: hidden;
  color: ${coreLightMinus1};
`;

export const StyledPlainHtml = styled.div`
  * {
    font-size: 14px;
    line-height: 20px;
    ${fontAlphaHeadline};

    ${large(css`
      font-size: 16px;
      line-height: 22px;
    `)}
  }

  a {
    color: ${halfBaked};

    &:hover {
      color: ${jungleMist};
    }
  }

  p {
    margin: 0;
  }
  b {
    font-weight: bold;
  }
  i {
    font-style: italic;
  }
  u {
    text-decoration: underline;
  }
`;
export const StyledMarker = styled.div`
  ${fontAlphaHeadline};
  margin-bottom: 5px;
`;
const StyledPictogram = styled.img`
  width: 17px;
  max-height: 17px;
`;

export const StyledTwitterCard = styled(Cards.Twitter)`
  margin-top: 25px;
`;

const StyledCardWrapper = styled.div`
  margin-top: 25px;
  max-width: 308px;
  text-decoration: none;

  ${medium(css`
    max-width: 388px;
  `)}

  ${large(css`
    max-width: 342px;
  `)}
  
  ${wide(css`
    max-width: 308px;
  `)}
  
  img {
    max-width: 100%;
    border-radius: 4px;
  }
`;

const LiveComment = ({ liveComment, labelPlayButton }) => {
  const iconUrl = get(liveComment, ['icon', 'svg'], null);
  const pictureUrl = get(liveComment, ['picture', 'format', 'url'], null);
  const shouldDisplayComment = !!liveComment.html || !!liveComment.marker || !!iconUrl || !!liveComment.tweet;

  return shouldDisplayComment ? (
    <StyledComment>
      <StyledCommentLeft>
        {!!liveComment.marker && <StyledMarker>{liveComment.marker}</StyledMarker>}
        {iconUrl && <StyledPictogram src={iconUrl} />}
      </StyledCommentLeft>
      <StyledCommentRight>
        {liveComment.html && <StyledPlainHtml dangerouslySetInnerHTML={{ __html: liveComment.html }} />}
        {pictureUrl && (
          <StyledCardWrapper>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={`${pictureUrl}?w=640`} />
          </StyledCardWrapper>
        )}
        {liveComment.tweet && <StyledTwitterCard tweetUrl={get(liveComment, ['tweet', 'url'], '')} />}
        {liveComment.sharedlink && (
          <StyledCardWrapper>
            <SharedLink sharedlink={liveComment.sharedlink} labelPlayButton={labelPlayButton} />
          </StyledCardWrapper>
        )}
      </StyledCommentRight>
    </StyledComment>
  ) : null;
};

LiveComment.defaultProps = {
  labelPlayButton: 'watch',
};

export const LiveCommentPropTypeShape = PropTypes.shape({
  id: PropTypes.number,
  icon: PropTypes.shape({
    svg: PropTypes.string,
  }),
  sharedlink: SharedLinkShape,
  marker: PropTypes.string,
  html: PropTypes.string,
  picture: PropTypes.shape({
    format: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  tweet: PropTypes.shape({
    url: PropTypes.string,
  }),
});

LiveComment.propTypes = {
  liveComment: LiveCommentPropTypeShape.isRequired,
  labelPlayButton: PropTypes.string,
};

export default LiveComment;
