import * as productsActions from '../actions/products';

export function products(state = [], action) {
  switch (action.type) {
    case productsActions.RECEIVE_PRODUCTS:
      return [
        ...action.products,
      ];
    case productsActions.DELETE_PRODUCT:
      return [
        ...state.filter(product => product.id !== action.payload)
      ];
    case productsActions.CREATE_PRODUCT:
      return [
        ...state,
        {
          ...action.payload,
          id: state.length + 1,
        },
      ];
    case productsActions.UPDATE_PRODUCT:
      const filteredState = state.filter(product => product.id !== action.payload.id);
      return [
        ...filteredState,
        {...action.payload},
      ]
    default:
      return state;
  }
}
