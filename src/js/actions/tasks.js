import axios from 'axios';
import { PRODUCTS_LOAD } from '../actions';

export function loadProducts() {
  return dispatch => (
    axios.post('http://localhost:3030/v1/services/products/find')
      .then(({ data: products }) => {
        dispatch({ type: PRODUCTS_LOAD, products });
      })
      .catch((payload) => {
        dispatch({ type: PRODUCTS_LOAD, error: true, payload });
      })
  );
}

export const val = true;
