import { connect } from 'react-redux';
import Content from '../Components/Content.js';

export const RECEIVE_EGGS = 'zone/RECEIVE_EGGS';
export const REQUEST_EGGS = 'zone/REQUEST_EGGS';
export const RECEIVE_SAVOURY_EGGS = 'zone/RECEIVE_SAVOURY_EGGS';
export const REQUEST_SAVOURY_EGGS = 'zone/REQUEST_SAVOURY_EGGS';

const fetchSweetEggs = () => {
    return function(dispatch) {
      dispatch(requestProducts());
      return fetch('http://demo2872766.mockable.io/eggs/sweet')
        .then(response => response.json())
        .then(json => dispatch(receiveProducts(json)));
    };
};

const fetchSavouryEggs = () => {
  return function(dispatch) {
    dispatch(requestSavouryEggs());
    return fetch('http://demo2872766.mockable.io/eggs/savoury')
      .then(response => response.json())
      .then(json => dispatch(receiveSavouryEggs(json)));
  };
};

function requestProducts() {
    return {
      type: REQUEST_EGGS,
      loading: true,
    };
}

function requestSavouryEggs() {
  return {
    type: REQUEST_SAVOURY_EGGS,
    loading: true,
  };
}
  
function receiveProducts(json) {
    return {
      type: RECEIVE_EGGS,
      eggs: json,
      loading: false,
    };
}

function receiveSavouryEggs(json) {
  return {
    type: RECEIVE_SAVOURY_EGGS,
    eggs: json,
    loading: false,
  };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSweetEggs: () => dispatch(fetchSweetEggs(RECEIVE_EGGS)),
        fetchSavouryEggs: () => dispatch(fetchSavouryEggs(RECEIVE_SAVOURY_EGGS)),
    };
};

// const scrambleEggs = (sweet, savoury) => {
//     console.log('sdsd',sweet);
//     console.log('sssss', savoury);
//     return sweet.concat(savoury);
// }

const mapStateToProps = state => {
    return {
        // eggs: scrambleEggs(state.eggs.eggs, state.eggs.savouryEggs),
        sweetEggs: state.eggs.eggs,
        savouryEggs: state.eggs.savouryEggs,
        loading: state.eggs.loading,
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Content);