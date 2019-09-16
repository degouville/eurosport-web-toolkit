import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { frenchGray } from '../../colors';

import CompactCard from './CompactCard';

const StyledIcon = styled.span`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 0 6px 10px;
  border-color: transparent transparent transparent ${frenchGray};
`;

const VodCompact = ({ card, ...props }) => <CompactCard card={card} icon={<StyledIcon />} {...props} />;

VodCompact.propTypes = {
  card: PropTypes.shape({
    img: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.string,
  }).isRequired,
};

export default VodCompact;
