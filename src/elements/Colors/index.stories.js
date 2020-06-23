import React from 'react';
import { storiesOf } from '@storybook/react';
import { object } from '@storybook/addon-knobs';
import { parseToHsl } from 'polished';
import { inRange, groupBy } from 'lodash';
import {
  jungleMist,
  halfBaked,
  turquoiseBlue,
  malibu,
  cerulean,
  azureRadiance,
  plausibleViolet,
  dodgerBlue,
  royalBlue,
  blueZodiac,
  bunting,
  haiti,
  radicalRed,
  torchRed,
  monza,
  venetianRed,
  utahCrimson,
  melanzane,
  white,
  athensGray,
  mirage,
  ebony,
  iron,
  alto,
  mischka,
  geyser,
  suitGray,
  frenchGray,
  spunPearl,
  manatee,
  comet,
  paleSky,
  regentGray,
  dustyGray,
  stormGray,
  scarpaFlow,
  mako,
  gunPowder,
  martinique,
  ebonyClay,
  blackPearl,
  lima,
} from '../../colors';
import ColorDiff from '.';

const setKeyValue = ([key, value]) => ({ [key]: value });
const setOption = color => {
  const hex = Object.values(color).pop();
  const { hue, saturation, lightness } = parseToHsl(hex);
  const greenRangeInHue = [60, 180];
  const blueRangeInHue = [180, 300];
  // NOTE: if not green or blue, it as to be red ! 🤷
  const isDark = lightness < 0.5;
  const isUnsaturate = saturation < 0.5;
  const isGreen = inRange(hue, ...greenRangeInHue);
  const isBlue = inRange(hue, ...blueRangeInHue);
  // eslint-disable-next-line no-nested-ternary
  const familly = isUnsaturate ? 'unsaturate' : isGreen ? 'green' : isBlue ? 'blue' : 'red';
  const option = { isDark, familly };
  return { ...color, option };
};
const byFamilly = ({ option: { familly: a } }, { option: { familly: b } }) => (a > b ? 1 : -1);
const byName = (colorA, colorB) => {
  const getValue = str => parseToHsl(Object.values(str).shift());
  const { lightness: a } = getValue(colorA);
  const { lightness: b } = getValue(colorB);
  return a > b ? 1 : -1;
};
const importedColorsWithName = Object.entries({
  jungleMist,
  halfBaked,
  turquoiseBlue,
  malibu,
  cerulean,
  azureRadiance,
  plausibleViolet,
  dodgerBlue,
  royalBlue,
  blueZodiac,
  bunting,
  haiti,
  radicalRed,
  torchRed,
  monza,
  venetianRed,
  utahCrimson,
  melanzane,
  white,
  athensGray,
  mirage,
  ebony,
  iron,
  alto,
  mischka,
  geyser,
  suitGray,
  frenchGray,
  spunPearl,
  manatee,
  comet,
  paleSky,
  regentGray,
  dustyGray,
  stormGray,
  scarpaFlow,
  mako,
  gunPowder,
  martinique,
  ebonyClay,
  blackPearl,
  lima,
});
const importedColorsWithLegacy = Object.entries({
  jungleMist,
  halfBaked,
  turquoiseBlue,
  malibu,
  cerulean,
  azureRadiance,
  plausibleViolet,
  dodgerBlue,
  royalBlue,
  blueZodiac,
  bunting,
  haiti,
  radicalRed,
  torchRed,
  monza,
  venetianRed,
  utahCrimson,
  melanzane,
  white,
  athensGray,
  mirage,
  ebony,
  iron,
  alto,
  mischka,
  geyser,
  suitGray,
  frenchGray,
  spunPearl,
  manatee,
  comet,
  paleSky,
  regentGray,
  dustyGray,
  stormGray,
  scarpaFlow,
  mako,
  gunPowder,
  martinique,
  ebonyClay,
  blackPearl,
  lima,
});

const format = colors =>
  colors
    .map(setKeyValue)
    .map(setOption)
    .sort(byName)
    .sort(byFamilly);

// eslint-disable-next-line import/prefer-default-export
export const colors = groupBy(format(importedColorsWithName), 'option.familly');
const colorsWithLegacy = groupBy(format(importedColorsWithLegacy), 'option.familly');

const colorDiff = storiesOf('Colors', module);

colorDiff
  .add('default', () => <ColorDiff colors={object('colors', colors)} />)
  .add('❌ Legacy', () => <ColorDiff colors={object('colors', colorsWithLegacy)} />);
