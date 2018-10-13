import axios from 'axios';
import { SITES_LOAD, SITES_UNLOAD } from '../actions';

export function loadSites() {
  return dispatch => (
    axios.post('http://localhost:3030/v1/services/sites/find')
      .then(({ data: sites }) => {
        dispatch({ type: SITES_LOAD, sites });
      })
      .catch((payload) => {
        dispatch({ type: SITES_LOAD, error: true, payload });
      })
  );
}

export function unloadSites() {
  return { type: SITES_UNLOAD };
}
