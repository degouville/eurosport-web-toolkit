import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import ShareSvg from 'src/assets/share.svg';
import ShareIcon from '../../elements/ShareIcon';
import { frenchGray } from '../../colors';
import { H5 } from '../../typography';

const Wrapper = styled.div`
  width: 320px;
  display: flex;
  align-items: center;
`;

const Icons = styled(ShareIcon)`
  margin-right: 20px;
`;

const Label = styled(H5)`
  text-transform: uppercase;
  color: ${frenchGray};
  margin-right: 20px;
  margin-top: 1px;
`;

const Share = styled.div`
  background: url(${ShareSvg}) no-repeat;
  width: 11px;
  height: 11px;
  margin-right: 10px;
`;

const ShareIcons = ({ label, icons, labelIcon }) => (
  <Wrapper>
    {labelIcon && <Share />}
    {label && <Label>{label}</Label>}
    {icons && icons.map(icon => <Icons key={icon.icon} icon={icon.icon} size={icon.size} onClick={icon.onClick} />)}
  </Wrapper>
);

ShareIcons.propTypes = {
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      size: PropTypes.number,
      onClick: PropTypes.func,
    })
  ).isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.bool,
};

ShareIcons.defaultProps = {
  label: null,
  labelIcon: false,
};

export default ShareIcons;
