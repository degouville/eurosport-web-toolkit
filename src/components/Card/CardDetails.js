import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import * as colors from '../../colors';
import ProgramDetails, { StyledIconWrapper, StyledSeparator, StyledText } from '../../elements/ProgramDetails';
import { medium } from '../../breakpoints';

const StyledContent = styled.div`
  padding: 16px 16px 8px;
  line-height: 1.3;
  flex: 1 auto;
  display: flex;
  flex-direction: column;
  width: auto;
`;

const StyledCategory = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${colors.malibu};
  letter-spacing: 1px;
  margin: 0 0 10px;
`;

const StyledFooterContentWrapper = styled.div`
  display: block;
  width: 100%;
`;

const StyledFooter = styled.div`
  flex: 1 auto;
  display: flex;
  align-items: flex-end;
  font-size: 14px;
`;

const StyledTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.athensGray};
  margin: 0 0 10px;
`;

const StyledDescription = styled.div`
  color: ${colors.manatee};
  font-size: 12px;
  line-height: 20px;
  margin: 0 0 10px;
`;

const StyledProgramDetails = styled(ProgramDetails)`
  flex-grow: 0;
  font-size: 12px;
  line-height: 1.3;

  ${StyledIconWrapper} {
    height: 15px;
    padding: 8px 0;
  }

  ${StyledText} {
    padding: 8px 8px 8px 0;
  }

  ${StyledSeparator} {
    margin: 0 8px 0 10px;
  }

  ${medium(css`
    font-size: 12px;
    line-height: 1.3;
  `)};
`;

const CardDetails = ({ card, icon, ...props }) => {
  const { category, title, description, timestamp, channel = null } = card;
  return (
    <StyledContent {...props}>
      <StyledCategory>{category}</StyledCategory>
      <StyledTitle>{title}</StyledTitle>
      {description && <StyledDescription>{description}</StyledDescription>}
      <StyledFooter>
        <StyledFooterContentWrapper>
          <StyledProgramDetails textDetail={timestamp} callsign={channel} customIcon={icon} />
        </StyledFooterContentWrapper>
      </StyledFooter>
    </StyledContent>
  );
};

CardDetails.propTypes = {
  card: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    timestamp: PropTypes.string,
    channel: PropTypes.string,
  }).isRequired,
  icon: PropTypes.node,
};

CardDetails.defaultProps = {
  icon: null,
};

CardDetails.displayName = 'Cards.Content';

export default CardDetails;
