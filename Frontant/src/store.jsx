import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer } from "../States/reducers/productReducer.";

const rootReducer = combineReducers({
  products: productReducer,
});

const middleware = ()=>{
  return [thunk]
};

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
 
});

export default store;
