import EComponent from 'src/assets/channels/E.component.svg';
import E1Component from 'src/assets/channels/E1.component.svg';
import E2Component from 'src/assets/channels/E2.component.svg';
import E2GRComponent from 'src/assets/channels/E2GR.component.svg';
import E2NOComponent from 'src/assets/channels/E2NO.component.svg';
import E2RUGComponent from 'src/assets/channels/E2RUG.component.svg';

export const icons = {
  E2GR: {
    altText: 'Eurosport 2',
    widthRatio: 3.5,
    component: E2GRComponent,
  },
  E2NO: {
    altText: 'Eurosport 2',
    widthRatio: 2.06,
    component: E2NOComponent,
  },
  E2RUG: {
    altText: 'Eurosport 2',
    widthRatio: 4,
    component: E2RUGComponent,
  },
  E1: {
    altText: 'Eurosport 1',
    widthRatio: 1.42,
    component: E1Component,
  },
  E2: {
    altText: 'Eurosport 2',
    widthRatio: 1.66,
    component: E2Component,
  },
  E: {
    altText: 'Eurosport',
    widthRatio: 0.87,
    component: EComponent,
  },
};

export default callsign => {
  if (callsign === 'E2GR') {
    return icons.E2GR;
  }

  if (callsign === 'E2NO') {
    return icons.E2NO;
  }

  if (callsign === 'E2RUG') {
    return icons.E2RUG;
  }

  if (callsign.startsWith('E1')) {
    return icons.E1;
  }

  if (callsign.startsWith('E2')) {
    return icons.E2;
  }
  return icons.E;
};
