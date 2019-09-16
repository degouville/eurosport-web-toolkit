import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as breakpoints from '../../breakpoints';
import * as colors from '../../colors';
import { Row, Column } from '../../elements/Grid';

const StyledWrapper = styled(Row)`
  color: ${colors.mirage};
`;

export const StyledTeaser = styled.h4`
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  ${breakpoints.wide(css`
    font-size: 18px;
    line-height: 28px;
  `)};
`;

export const StyledHtml = styled.div`
  font-size: 14px;
  margin-top: 25px;
  line-height: 20px;
  ${breakpoints.wide(css`
    font-size: 16px;
    line-height: 24px;
  `)};
  p {
    margin-top: 15px;
  }
`;

const ArticleContent = props => {
  const { teaser, html, ...otherProps } = props;
  return (
    <StyledWrapper {...otherProps}>
      <Column mediumOffset="2" medium="8" large="5">
        {teaser && <StyledTeaser>{teaser}</StyledTeaser>}
        {html && (
          <StyledHtml>
            {/* eslint-disable react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </StyledHtml>
        )}
      </Column>
    </StyledWrapper>
  );
};

ArticleContent.defaultProps = {
  teaser: '',
  html: '',
};

ArticleContent.propTypes = {
  teaser: PropTypes.string,
  html: PropTypes.string,
};

export default ArticleContent;
