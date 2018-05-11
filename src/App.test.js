import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EggWrapper, Egg } from './Components/Content.js';

configure({ adapter: new Adapter() });

describe('egg wrapper component', () => {
  it('should render the egg wrapper component', () => {
    const details = {};
    const eggWrapper = shallow(
      <EggWrapper details={details} />
    );
    expect(eggWrapper.find('.eggWrapperComponent').exists()).toEqual(true);
  });
});

describe('egg component', () => {
  it('should render the egg component', () => {
    const details = {};
    const egg = shallow(
      <Egg details={details} />
    );
    expect(egg.find('.egg').exists()).toEqual(true);
  });
});
