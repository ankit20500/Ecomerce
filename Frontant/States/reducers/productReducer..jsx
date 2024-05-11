import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from '../constants/productConstants';
  
  const initialState = {
    loading: false,
    products: [],
    productsCount: 0,
    error: null
  };
  const init={
      product: null,
      loading: false,
      error: null
   
  }
  
  export const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALL_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true
        };
      case ALL_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: action.payload.product,
          productsCount: action.payload.productsCount
        };
      case ALL_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        };
      default:
        return state;
    }
  };


  // export const productRDetailseducer = (state = init, action) => {
  //   switch (action.type) {
  //     case PRODUCT_DETAILS_REQUEST:
  //       return {
  //         ...state,
  //         loading: true
  //       };
  //     case PRODUCT_DETAILS_SUCCESS:
  //       return {
  //         ...state,
  //         loading: false,
  //         product: action.payload.product,
          
  //       };
  //     case PRODUCT_DETAILS_FAIL:
  //       return {
  //         ...state,
  //         loading: false,
  //         error: action.payload
  //       };
  //     case CLEAR_ERRORS:
  //       return {
  //         ...state,
  //         error: null
  //       };
  //     default:
  //       return state;
  //   }
  // };
  

  