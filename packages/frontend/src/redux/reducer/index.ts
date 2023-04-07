import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAILS,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_BRANDS,
  GET_ALL_CATEGORIES,
  ADD_USER,
} from "../actions/index";

interface sliceState {
  user: any;
  products: Array<any>;
  adminProducts: Array<any>;
  brands: any;
  categories: any;
  productDetail: any;
  totalItems: any;
  cardsForPages: any;
}

const initialState: sliceState = {
  user: {},
  products: [],
  adminProducts: [],
  brands: [],
  categories: [],
  productDetail: {},
  totalItems: 0,
  cardsForPages: 0,
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Acá va tu código:
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload.products.filter((e: any) => !e.isTrashed),
        totalItems: action.payload.totalItems,
        cardsForPages: action.payload.pageSize,
        adminProducts: action.payload.products,
      };

    case GET_ALL_CATEGORIES:
      return { ...state, categories: action.payload };

    case GET_ALL_BRANDS:
      return { ...state, brands: action.payload };

    case CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((e: any) => e.id !== action.payload),
      };

    case GET_PRODUCT_DETAILS:
      return { ...state, productDetail: action.payload };

    case ADD_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
