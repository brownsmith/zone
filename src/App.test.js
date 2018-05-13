import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EggWrapper, Egg } from './Components/Content.js';
import {
  REQUEST_EGGS,
  REQUEST_SAVOURY_EGGS,
  RECEIVE_EGGS,
  requestProducts,
  requestSavouryEggs,
  receiveProducts,
} from './Containers/Content.js';

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
    const details = {
      label: 'BE'
    };
    const egg = shallow(
      <Egg details={details} />
    );
    expect(egg.find('.egg').exists()).toEqual(true);
  });
});

describe('egg reducers', () => {
  it('should handle requestProducts', () => {
    const initialState = {};
    expect(requestProducts(initialState, requestProducts)).toEqual(
      {
        type: REQUEST_EGGS,
        loading: true,
      }
    );
  });

  it('should handle requestSavouryEggs', () => {
    const initialState = {};
    expect(requestSavouryEggs(initialState, requestProducts)).toEqual(
      {
        type: REQUEST_SAVOURY_EGGS,
        loading: true,
      }
    );
  });

  it('should handle receiveProducts', () => {
    const initialState = {};
    const json = {}
    expect(receiveProducts(initialState, receiveProducts)).toEqual(
      {
        type: RECEIVE_EGGS,
        eggs: {},
        loading: false,
      }
    );
  });
});
