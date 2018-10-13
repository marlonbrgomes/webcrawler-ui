import { SITES_LOAD, SITES_UNLOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  sites: []
};

const handlers = {
  [SITES_LOAD]: (state, { sites, error }) => {
    if (!error) {
      return { ...state, sites, error: undefined };
    }
  },
  [SITES_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
