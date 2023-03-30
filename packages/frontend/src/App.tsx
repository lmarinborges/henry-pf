import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

const routes = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<h1>Public Layout</h1>}>
      <Route index element={<Navigate to="/home" />} />
      <Route path="home" element={<h1>Landing Page</h1>} />
      <Route path="about" element={<h1>Sobre Nosotros</h1>} />
      <Route path="contact" element={<h1>Información de Contacto</h1>} />
      <Route path="products" element={<h1>Listado de Productos</h1>}>
        <Route path=":productId" element={<h1>Información de Producto</h1>} />
      </Route>
    </Route>,
    <Route path="/admin" element={<h1>Layout de Administrador</h1>}>
      <Route path="products" element={<h1>Administración de Productos</h1>} />
    </Route>,
  ])
);

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={routes} />
    </ChakraProvider>
  );
}
