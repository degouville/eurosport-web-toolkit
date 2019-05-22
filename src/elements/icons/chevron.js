import React from 'react';

// eslint-disable-next-line react/prop-types
const ChevronIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 9" height="9" width="6" className={className}>
    <path d="M1.15 0L0 1.06 3.71 4.5 0 7.94 1.15 9 6 4.5z" />
  </svg>
);

ChevronIcon.displayName = 'ChevronIcon';

export default ChevronIcon;
