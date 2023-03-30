import { createBrowserRouter } from "react-router-dom";
import App from "../routes/App";
import About from "../routes/About";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    //element: <Landing />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    //element:<Contact/>
  },
  {
    path: "/login",
    //element:<Login/>
  },
  {
    path: "/register",
    //element:<Register/>
  },
  {
    path: "/products",
    //  element:<Products/>
  },
  {
    path: "/products/:id",
    //  element:<ProductDetail/>
  },
]);
