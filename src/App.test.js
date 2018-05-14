import React from 'react';
import ReactDOM from 'react-dom';
import { expect} from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Content, { EggWrapper, Egg } from './Components/Content.js';
import { CircularProgress } from 'material-ui/Progress';
import {
  REQUEST_EGGS,
  REQUEST_SAVOURY_EGGS,
  RECEIVE_EGGS,
  RECEIVE_SAVOURY_EGGS,
  requestSweetEggs,
  requestSavouryEggs,
  receiveSweetEggs,
  receiveSavouryEggs,
} from './Containers/Content.js';

configure({ adapter: new Adapter() });

describe('Content component', () =>{
  it('should render the <CircularProgress /> spinner component if loading is true', () => {
    const props = {
      loading: true,
      doEverything: () => {},
    };
    const wrapper = shallow(<Content {...props} />);
    expect(wrapper.find(CircularProgress)).to.have.length(1);
  });
});

describe('EggWrapper component', () => {
  it('should render the <EggWrapper /> component', () => {
    const eggs = {};
    const eggWrapper = shallow(
      <EggWrapper eggs={eggs} />
    );
    expect(eggWrapper.find('.eggWrapperComponent').exists()).to.equal(true);
  });
});

describe('Egg component', () => {
  it('should render the <Egg /> component', () => {
    const details = {
      label: 'BE'
    };
    const egg = shallow(
      <Egg details={details} />
    );
    expect(egg.find('.egg').exists()).to.equal(true);
  });
});

describe('egg reducers', () => {
  it('should handle requestSweetEggs', () => {
    const initialState = {};
    expect(requestSweetEggs(initialState, requestSweetEggs)).to.eql(
      {
        type: REQUEST_EGGS,
        loading: true,
        eggs: [],
      }
    );
  });

  it('should handle requestSavouryEggs', () => {
    const initialState = {};
    expect(requestSavouryEggs(initialState, requestSavouryEggs)).to.eql(
      {
        type: REQUEST_SAVOURY_EGGS,
        loading: true,
        eggs: [],
      }
    );
  });

  it('should handle receiveSweetEggs', () => {
    const initialState = {};
    const json = {}
    expect(receiveSweetEggs(initialState, receiveSweetEggs)).to.eql(
      {
        type: RECEIVE_EGGS,
        eggs: {},
        loading: false,
      }
    );
  });

  it('should handle receiveSavouryEggs', () => {
    const initialState = {};
    const json = {};
    expect(receiveSavouryEggs(initialState, receiveSavouryEggs)).to.eql(
      {
        type: RECEIVE_SAVOURY_EGGS,
        eggs: {},
        loading: false,
      }
    );
  });
});
