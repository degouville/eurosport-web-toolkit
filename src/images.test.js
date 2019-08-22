import React from 'react';
import styled from 'react-emotion';
import { shallow } from 'enzyme';
import { retinaImage, responsiveRetinaImage } from './images';

const renderImage = image => {
  const StyledDiv = styled.div`
    background-image: ${image};
  `;
  return shallow(<StyledDiv />);
};

describe('retinaImage', () => {
  it('produces the css for a retina image', () => {
    const image = retinaImage({
      default: 'image',
      x2: 'imageX2',
      x3: 'imageX3',
    });
    expect(renderImage(image)).toMatchSnapshot();
  });
});

describe('responsiveRetinaImage', () => {
  it('produces the css for a responsive retina image', () => {
    const image = responsiveRetinaImage({
      mobile: {
        default: 'image375',
        x2: 'image375X2',
        x3: 'image375X3',
      },
      over480: {
        default: 'image768',
        x2: 'image768X2',
        x3: 'image768X3',
      },
      over700: {
        default: 'image1024',
        x2: 'image1024X2',
        x3: 'image1024X3',
      },
      over1024: {
        default: 'image1440',
        x2: 'image1440X2',
        x3: 'image1440X3',
      },
    });
    expect(renderImage(image)).toMatchSnapshot();
  });
});
