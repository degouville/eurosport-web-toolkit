import { shallow } from 'enzyme/build';
import React from 'react';
import Betting, { getRandomSentence } from '.';
import { doubleChoiceData, tripleChoiceData } from './mock';

describe('Betting', () => {
  beforeEach(() => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0;
    global.Math = mockMath;
  });
  it('renders Betting for double choices', () => {
    expect(shallow(<Betting {...doubleChoiceData} />)).toMatchSnapshot();
  });

  it('renders Betting for triple choices', () => {
    expect(shallow(<Betting {...tripleChoiceData} />)).toMatchSnapshot();
  });
  it('should return a random sentence', () => {
    expect(getRandomSentence(['a', 'b'])).toEqual('a');
    global.Math.random = () => 0.8;
    expect(getRandomSentence(['a', 'b'])).toEqual('b');
  });
});
