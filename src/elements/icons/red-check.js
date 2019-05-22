import React from 'react';

// eslint-disable-next-line react/prop-types
const RedCheck = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 18" className={className}>
    <path fill="#EE2145" fillRule="nonzero" d="M6.043 11.461L1.51 6.93 0 8.44l6.043 6.043L18.992 1.534 17.48.024z" />
  </svg>
);

RedCheck.displayName = 'RedCheck';

export default RedCheck;
