import EComponent from '../icons/channels/E';
import E1Component from '../icons/channels/E1';
import E2Component from '../icons/channels/E2';
import E2GRComponent from '../icons/channels/E2GR';
import E2NOComponent from '../icons/channels/E2NO';
import E2RUGComponent from '../icons/channels/E2RUG';

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
