import { css } from 'react-emotion';

export const retinaImage = retinaImageSrc => css`
  background-image: url(${retinaImageSrc.default});
  @media (-webkit-min-device-pixel-ratio: 2) {
    background-image: url(${retinaImageSrc.x2});
  }
  @media (-webkit-min-device-pixel-ratio: 3) {
    background-image: url(${retinaImageSrc.x3});
  }
`;

export const responsiveRetinaImage = image => css`
  ${retinaImage(image.mobile)};
  @media (min-width: 481px) {
    ${retinaImage(image.over480)};
  }
  @media (min-width: 701px) {
    ${retinaImage(image.over700)};
  }
  @media (min-width: 1025px) {
    ${retinaImage(image.over1024)};
  }
`;
