import React from "react";

export default function reducer(state={}, action) {
switch(action.type) {
    case "SET_SOMETHING": {
      return {...state, something:action.payload}
    }
  }
  return state 
}