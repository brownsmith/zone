import { RECEIVE_EGGS, REQUEST_EGGS, RECEIVE_SAVOURY_EGGS, REQUEST_SAVOURY_EGGS } from '../Containers/Content.js';

const initialState = {
  loading: false,
  eggs: [],
};

export const eggs = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_EGGS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_EGGS:
      return {
        ...state,
        loading: false,
        eggs: action.eggs,
      };
    case REQUEST_SAVOURY_EGGS:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_SAVOURY_EGGS:
      return {
        ...state,
        loading: false,
        eggs: [...action.eggs, ...state.eggs.filter((egg) => egg.category !== 'savoury')],
      };
    default:
      return state;
  }
};
