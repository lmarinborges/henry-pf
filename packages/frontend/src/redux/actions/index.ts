import axios from "axios";
import { AppDispatch } from "../store/index";

// Aca deben declarar las variables donde tengan el action types.
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_BRANDS = "GET_ALL_BRANDS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_USER = "ADD_USER";

export const getAllProducts =
  (
    orderBy: string,
    alphaOrder: string,
    currentPage: string,
    brandFilter: number,
    categoryFilter: number
  ) =>
  async (dispatch: AppDispatch) => {
    console.log(typeof categoryFilter);
    console.log(typeof brandFilter);
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
    console.log(res.data);
    dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
  };

export const deleteProduct = (data: any) => async (dispatch: AppDispatch) => {
  const res = await axios.patch(`http://localhost:4000/products/${data.id}`, {
    ...data,
    isTrashed: true,
  });
  dispatch({ type: DELETE_PRODUCT, payload: res.data.id });
};

export const addUserFromFb = () => async (dispatch: AppDispatch) => {
  const width = 600;
  const height = 400;
  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;
  const authWindow = window.open(
    "http://localhost:4000/auth/facebook",
    "facebook-login",
    `width=${width},height=${height},left=${left},top=${top}`
  );
  if (authWindow == null) {
    throw Error("no se puede llamar al login");
  }
  const handleAuthResponse = (event: any) => {
    if (event.origin !== "http://localhost:4000") return;
    if (event.data.isAuthenticated) {
      console.log(event.data);
      dispatch({ type: ADD_USER, payload: event.data.user });
    }
  };
  window.addEventListener("message", handleAuthResponse);
  const intervalId = setInterval(() => {
    if (authWindow.closed) {
      clearInterval(intervalId);
      window.removeEventListener("message", handleAuthResponse);
    }
  }, 1000);
};

export const addUserFromLocal =
  (data: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/localLogin",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true, // permite recibir cookies del servidor
        }
      );
      const { state, user } = response.data;
      if (state === "success") {
        // La autenticación fue exitosa, hacer algo con los datos del usuario
        console.log(`Bienvenido ${user.name}!`);
        //el modal se cierra
        dispatch({ type: ADD_USER, payload: user });
      } else {
        // La autenticación falló, hacer algo en consecuencia
        alert("la autenticacion falló");
        console.log("La autenticación falló");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const registerUser = (data: any) => async (dispatch: AppDispatch) => {
  const userData = {
    name: data.name,
    email: data.email,
    password: data.password,
    role: "USER", //por defecto
    state: "active", // por defecto por ahora
  };
  try {
    const response = await axios.post("http://localhost:4000/users", userData);
    if (response.data.state === "success") {
      alert("Bienvenido, revisa tu correo e inicia session");
      dispatch(addUserFromLocal(data));
    }
  } catch (error: any) {
    console.error(error.response?.data);
    alert(
      error.response?.data?.message ??
        "Ocurrió un error al procesar la solicitud"
    );
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  const res = await axios.get(`http://localhost:4000/logout`);
  // verificamos si se deslogueo correctamente
  dispatch({ type: ADD_USER, payload: {} });
};
