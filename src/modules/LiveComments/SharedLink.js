import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Cards from '../../components/Card';

const SharedLink = ({ sharedlink, labelPlayButton }) => {
  const image = get(sharedlink, ['pictureurl'], '');

  const sharedLinkProps = {
    title: get(sharedlink, ['title'], ''),
    labelPlayButton: get(sharedlink, ['link', 'type'], '') === 2 ? labelPlayButton : '',
    image: image ? `${image}?w=640` : '',
    link: get(sharedlink, ['url'], ''),
  };

  return <Cards.CardSmall {...sharedLinkProps} target="_blank" />;
};

export const SharedLinkShape = PropTypes.shape({
  title: PropTypes.string,
  url: PropTypes.string,
  link: PropTypes.shape({
    type: PropTypes.number,
  }),
  pictureurl: PropTypes.string,
});

SharedLink.propTypes = {
  sharedlink: SharedLinkShape.isRequired,
  labelPlayButton: PropTypes.string.isRequired,
};

export default SharedLink;
