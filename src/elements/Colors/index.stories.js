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

  _brandMinus2: '#30355e',
  _brandMinus1: '#1f2555',
  _brandBase: '#141b4d',
  _brandPlus1: '#0f1236',
  _brandPlus2: '#060825',
  _actionOneLightMinus1: '#7ca1ff',
  _actionOneLightBase: '#497cff',
  _actionOneLightPlus1: '#1657ff',
  _actionTwoLightMinus1: '#ff3d5c',
  _actionTwoLightBase: '#ff0043',
  _actionTwoLightPlus1: '#cc0036',
  _actionOneDarkMinus1: '#7982ff',
  _actionOneDarkBase: '#4652ff',
  _actionOneDarkPlus1: '#1322ff',
  _actionTwoDarkMinus1: '#ff0943',
  _actionTwoDarkBase: '#d50032',
  _actionTwoDarkPlus1: '#a20026',
  _coreLightMinus1: '#ffffff',
  _coreLightBase: '#f8f8f9',
  _coreDarkBase: '#151726',
  _coreDarkPlus1: '#04050f',
  _coreNeutral1: '#dedfe3',
  _coreNeutral2: '#c6c7ce',
  _coreNeutral3: '#afafbb',
  _coreNeutral4: '#9798a6',
  _coreNeutral5: '#808293',
  _coreNeutral6: '#6b6c80',
  _coreNeutral7: '#55586d',
  _coreNeutral8: '#41435b',
  _coreNeutral9: '#2d304a',
  _coreNeutral10: '#2d2f4a',
  _coreNeutral11: '#4f526a',
  _featureOneMinus2: '#66cef9',
  _featureOneMinus1: '#3fc1f8',
  _featureOneBase: '#00acf5',
  _featureOnePlus1: '#009ef2',
  _featureOnePlus2: '#0092f0',
  _featureTwoMinus2: '#7deef2',
  _featureTwoMinus1: '#4ce8ed',
  _featureTwoBase: '#06dfe7',
  _featureTwoPlus1: '#05d1d9',
  _featureTwoPlus2: '#02c2ca',
  _featureThreeMinus2: '#9eed6e',
  _featureThreeMinus1: '#89e94f',
  _featureThreeBase: '#74e530',
  _featureThreePlus1: '#61de24',
  _featureThreePlus2: '#44d313',
  _featureFourMinus2: '#fff580',
  _featureFourMinus1: '#fff04d',
  _featureFourBase: '#ffea00',
  _featureFourPlus1: '#ffdf00',
  _featureFourPlus2: '#ffd200',
  _featureFiveMinus2: '#ff9a56',
  _featureFiveMinus1: '#ff8838',
  _featureFiveBase: '#ff7315',
  _featureFivePlus1: '#ff5c0f',
  _featureFivePlus2: '#ff4709',
  _featureSixMinus2: '#ff72ce',
  _featureSixMinus1: '#ff60c8',
  _featureSixBase: '#ff48bf',
  _featureSixPlus1: '#ff34aa',
  _featureSixPlus2: '#ff1e94',
  _featureSevenMinus2: '#ae43dd',
  _featureSevenMinus1: '#9f30d6',
  _featureSevenBase: '#9600d4',
  _featureSevenPlus1: '#8800cc',
  _featureSevenPlus2: '#7900c3',
  _midnightExpress: '#22263c',
  _midnightExpress2: '#1e2037',
  _arsenic: '#3d4248',
  _whiteLilac: '#e8e8eb',
  _gunPowder: '#3f455d',
  _dodgerBlue: '#35D0FE',
  _dodgerBlue2: '#4652FF',
  _flawlessMahogany: '#353851',
  _nobel: '#979797',
  _blackRussian: '#3E4159',
  _manatee: '#8185A0',
  _martinique: '#353851',
  _stormGray: '#6D6D78',
  _ebonyClay: '#252741',
  _halfBaked: '#87C3D4',
  _jungleMist: '#AECCD4',
  _athensGray: '#E3E4EA',
  _scarpaGrey: '#4c4b4f',
  _loftySilver: '#ffffff',
  _significantAzure: '#4A7EFF',
  _crashingAmber: '#434450',
  _hydroelectricTar: '#131625',
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
