import { connect } from 'react-redux';
import Content from '../Components/Content.js';

export const RECEIVE_EGGS = 'zone/RECEIVE_EGGS';
export const REQUEST_EGGS = 'zone/REQUEST_EGGS';

const fetchEggs = () => {
    return function(dispatch) {
      dispatch(requestProducts());
      return fetch('http://demo2872766.mockable.io/eggs/sweet')
        .then(response => response.json())
        .then(json => dispatch(receiveProducts(json)));
    };
};

function requestProducts() {
    return {
      type: REQUEST_EGGS,
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

const mapDispatchToProps = dispatch => {
    return {
        fetchEggs: () => dispatch(fetchEggs(RECEIVE_EGGS)),
    };
};

const mapStateToProps = state => {
    return {
      eggs: state.eggs.eggs,
      loading: state.eggs.loading,
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Content);