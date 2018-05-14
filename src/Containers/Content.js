import { connect } from 'react-redux';
import Content from '../Components/Content.js';

export const RECEIVE_EGGS = 'zone/RECEIVE_EGGS';
export const REQUEST_EGGS = 'zone/REQUEST_EGGS';
export const RECEIVE_SAVOURY_EGGS = 'zone/RECEIVE_SAVOURY_EGGS';
export const REQUEST_SAVOURY_EGGS = 'zone/REQUEST_SAVOURY_EGGS';

const fetchSweetEggs = () => {
    return function(dispatch) {
      dispatch(requestSweetEggs());
      return fetch('http://demo2872766.mockable.io/eggs/sweet')
        .then(response => response.json());
    };
};

const fetchSavouryEggs = () => {
  return function(dispatch) {
    dispatch(requestSavouryEggs());
    return fetch('http://demo2872766.mockable.io/eggs/savoury')
      .then(response => response.json());
  };
};

function doEverything(onlySavoury) {
  return function(dispatch) {
    const promises = [dispatch(fetchSavouryEggs(RECEIVE_SAVOURY_EGGS))];

    if (!onlySavoury) {
      promises.push(dispatch(fetchSweetEggs(RECEIVE_EGGS)));
    }

    return Promise.all(promises).then(json => {
      const allEggs = [...json[0], ...(json.length === 2 ? json[1] : [])];
      dispatch(receiveSweetEggs(allEggs));
    });
  };
}

export function requestSweetEggs() {
    return {
      type: REQUEST_EGGS,
      loading: true,
      eggs: [],
    };
}

export function requestSavouryEggs() {
  return {
    type: REQUEST_SAVOURY_EGGS,
    loading: true,
    eggs: [],
  };
}
  
export function receiveSweetEggs(json) {
    return {
      type: RECEIVE_EGGS,
      eggs: json,
      loading: false,
    };
}

export function receiveSavouryEggs(json) {
  return {
    type: RECEIVE_SAVOURY_EGGS,
    eggs: json,
    loading: false,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      fetchSweetEggs: () => dispatch(fetchSweetEggs(RECEIVE_EGGS)),
      doEverything: (onlySavoury) => dispatch(doEverything(onlySavoury)),
  };
};

const mapStateToProps = state => {
  return {
      eggs: state.eggs.eggs,
      savouryEggs: state.eggs.savouryEggs,
      loading: state.eggs.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);