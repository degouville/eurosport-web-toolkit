import React from 'react';

// eslint-disable-next-line react/prop-types
const PlayIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className={className}>
    <path
      fill="#fff"
      d="M41.31 22.27L13.3 39.77A1.5 1.5 0 0 1 11 38.5v-35a1.5 1.5 0 0 1 2.3-1.27l28.01 17.5a1.5 1.5 0 0 1 0 2.54z"
    />
  </svg>
);

PlayIcon.dispayName = 'PlayIcon';

export default PlayIcon;
