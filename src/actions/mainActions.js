import axios from "axios"

export function getEvents() {
  return function(dispatch) {
    dispatch({type:'START_GETTING_EVENTS'})
    axios({
      url: API_URL+'/events/',
      method: 'GET',
      headers: { Authorization: `Bearer ${getAccessToken()}`},
      withCredentials: true
    }).then(response => {
      dispatch({type:'SET_EVENTS', payload: response.data.payload})
    }).catch(function(e) {
      dispatch({type:'SET_EVENTS_FAIL', payload: e})
    })
  }
}