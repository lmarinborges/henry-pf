import axios from "axios";
import { AppDispatch } from "../store/index";

// Aca deben declarar las variables donde tengan el action types.
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_BRANDS = "GET_ALL_BRANDS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const GET_PRODUCT_REVIEWS = "GET_PRODUCT_REVIEWS";

export const getAllProducts =
  (
    orderBy: string,
    alphaOrder: string,
    currentPage: string,
    brandFilter: number,
    categoryFilter: number
  ) =>
  async (dispatch: AppDispatch) => {
    if (categoryFilter === 0 && brandFilter === 0) {
      await fetch(
        `http://localhost:4000/products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}`
      )
        .then((res) => res.json())
        .then((data) => dispatch({ type: GET_ALL_PRODUCTS, payload: data }));
    } else if (categoryFilter !== 0 && brandFilter !== 0) {
      await fetch(
        `http://localhost:4000/products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}&categoryId=${categoryFilter}&brandId=${brandFilter}`
      )
        .then((res) => res.json())
        .then((data) => dispatch({ type: GET_ALL_PRODUCTS, payload: data }));
    } else if (categoryFilter === 0 && brandFilter !== 0) {
      await fetch(
        `http://localhost:4000/products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}&brandId=${brandFilter}`
      )
        .then((res) => res.json())
        .then((data) => dispatch({ type: GET_ALL_PRODUCTS, payload: data }));
    } else if (categoryFilter !== 0 && brandFilter === 0) {
      await fetch(
        `http://localhost:4000/products?column=${orderBy}&order=${alphaOrder}&page=${currentPage}&categoryId=${categoryFilter}`
      )
        .then((res) => res.json())
        .then((data) => dispatch({ type: GET_ALL_PRODUCTS, payload: data }));
    }
  };

export const getProductDetail =
  (id: string) => async (dispatch: AppDispatch) => {
    const data = await fetch(`http://localhost:4000/products/${id}`).then(
      (res) => res.json()
    );
    dispatch({ type: GET_PRODUCT_DETAILS, payload: data });
  };

export const createProduct = (data: any) => async (dispatch: AppDispatch) => {
  const res = await axios
    .post(`http://localhost:4000/products/`, {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      price: data.price,
      stock: data.stock,
      brandId: data.brandId,
      categoryId: data.categoryId,
    })
    .then((res) => res.data);
  dispatch({ type: CREATE_PRODUCT, payload: res });
};

export const getAllBrands = () => async (dispatch: AppDispatch) => {
  const res = await fetch("http://localhost:4000/brands").then((data) =>
    data.json()
  );
  dispatch({ type: GET_ALL_BRANDS, payload: res });
};

export const getAllCategories = () => async (dispatch: AppDispatch) => {
  const res = await fetch("http://localhost:4000/categories").then((data) =>
    data.json()
  );
  dispatch({ type: GET_ALL_CATEGORIES, payload: res });
};

export const getProductsPerPage =
  (page: number) => async (dispatch: AppDispatch) => {
    const res = await axios.get(`http://localhost:4000/products?page=${page}`);
    // console.log(res.data);
    dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
  };

export const deleteProduct = (data: any) => async (dispatch: AppDispatch) => {
  const res = await axios.patch(`http://localhost:4000/products/${data.id}`, {
    ...data,
    isTrashed: true,
  });
  dispatch({ type: DELETE_PRODUCT, payload: res.data.id });
};

export const patchProduct = async (data: any) => {
  let res: any = {
    name: data.name,
    description: data.description,
    imageUrl: data.imageUrl,
    price: data.price,
    stock: data.stock ? Number.parseInt(data.stock) : "",
    brandId: data.brandId,
    categoryId: data.categoryId
  }

  var propsData: any
  for (const key in res) {
    if (res[key] !== "") propsData = {...propsData, [key]:res[key]}
  }

  let result = await axios.patch(`http://localhost:4000/products/${data.id}`, propsData)
  console.log(result.data);
}

export const createReview = (data: any) => async (dispatch: AppDispatch) => {
  const res = await axios
    .post(`http://localhost:4000/reviews/`, {
      comments: data.comment,
      score: Number(data.score),
      productId: Number(data.productId),
      userId: 1,
    })
    .then((res) => res.data);
  dispatch({ type: CREATE_PRODUCT, payload: res });
};

export const getProductReviews =
  (productId: string) => async (dispatch: AppDispatch) => {
    const data = await fetch(`http://localhost:4000/reviews/${productId}`).then(
      (res) => res.json()
    );
    dispatch({ type: GET_PRODUCT_REVIEWS, payload: data });
  };
