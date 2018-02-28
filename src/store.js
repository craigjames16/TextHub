import { applyMiddleware, createStore } from "redux"
// import {DEV} from 'config.js';
import reducer from "./reducers"



var middleware;

// if (DEV) {
    // middleware = applyMiddleware(promise(), thunk, createLogger())    
// } else {
    // Initialize LogRocket with your app ID
    
    middleware = applyMiddleware()    
// }


export default createStore(reducer, middleware)
