import React from 'react';

// eslint-disable-next-line react/prop-types
const E1channel = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 15" className={className}>
    <title>Eurosport 1</title>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(15 .1)">
        <mask id="a" fill="#fff">
          <path d="M6 14.89V0H0v14.89z" />
        </mask>
        <path
          fill="#c6c7ce"
          d="M6 .48A.49.49 0 0 0 5.5 0h-5a.5.5 0 0 0-.5.48v2.1c0 .29.19.5.48.5h2.14V14.4a.47.47 0 0 0 .47.48h2.44a.47.47 0 0 0 .47-.48V.48z"
          mask="url(#a)"
        />
      </g>
      <path
        fill="#c6c7ce"
        d="M6.79 4.37H3.5V.63c0-.27.22-.48.48-.48h8.54c.27 0 .49.22.49.48v2.1c0 .29-.18.5-.47.5H6.8v1.14zm-3.4 10.67l3.4-3.07h5.75c.28 0 .48.23.48.48v2.1c0 .28-.2.5-.46.5H3.4zM6.79 9.2l4.34-1.87H6.8V4.37L4.27 7.33H0l2.73 1.86-2.34 2.78 3.9-1.7 2.5 1.7z"
      />
    </g>
  </svg>
);

E1channel.displayName = 'E1channel';

export default E1channel;
