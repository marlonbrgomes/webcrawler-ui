import { TASKS_UNLOAD, TASK_LOAD, TASK_UNLOAD, PRODUCTS_LOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  products: [],
  task: undefined
};

const handlers = {
  [PRODUCTS_LOAD]: (state, { products, error }) => {
    if (!error) {
      console.log(products);
      return { ...state, products, error: undefined };
    }
    // return { error: action.payload };
  },
  [TASKS_UNLOAD]: () => initialState,
  [TASK_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [TASK_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
