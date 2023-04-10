import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAILS,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_BRANDS,
  GET_ALL_CATEGORIES,
  SEARCH_PRODUCT,
  CREATE_REVIEW,
  GET_PRODUCT_REVIEWS,
  ADD_USER,
  GET_USERS_REVIEWS,
  GET_ALL_PRODUCTS_ADMIN,
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
  search: string;
  reviews: Array<any>;
  productReviews: Array<any>;
  reviewUsers: Array<any>;
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
  search: "",
  reviews: [],
  productReviews: [],
  reviewUsers: [],
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Acá va tu código:
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        totalItems: action.payload.totalItems,
        cardsForPages: action.payload.pageSize,
      };
    case GET_ALL_PRODUCTS_ADMIN:
      return {
        ...state,
        adminProducts: action.payload.products,
        totalItems: action.payload.totalItems,
        cardsForPages: action.payload.pageSize,
      };

    case SEARCH_PRODUCT:
      return { ...state, search: action.payload };

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
    default:
      return state;

    case CREATE_REVIEW:
      return { ...state, reviews: [...state.products, action.payload] };

    case GET_PRODUCT_REVIEWS:
      return { ...state, productReviews: action.payload };

    case GET_USERS_REVIEWS:
      return { ...state, reviewUsers: action.payload };

    case ADD_USER:
      return { ...state, user: action.payload };
  }
};

export default rootReducer;
