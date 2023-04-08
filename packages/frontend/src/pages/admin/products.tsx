import React from "react";
import Tabla from "./Table";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/index";
import { useEffect, useState } from "react";
import * as actions from "../../redux/actions/index";
import { EditTable } from "./editTable/EditTable";

const ProductsAdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [Pages, setPages] = useState(0);

  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => [...state.adminProducts]);
  const allItems = useSelector((state: RootState) => state.totalItems);
  const cardsPerPage = useSelector((state: RootState) => state.cardsForPages);

  useEffect(() => {
    dispatch(actions.getProductsPerPage(currentPage));
    setPages(Math.round(allItems / cardsPerPage) + 1);
  }, [dispatch, currentPage, allItems, cardsPerPage]);

  // console.log(currentPage, Pages);
  // console.log(data);

  const nextPage = () => {
    let num = currentPage + 1;
    if (num <= Pages) setCurrentPage(() => num);
  };
  const backPage = () => {
    let num = currentPage - 1;
    if (num > 0) {
      setCurrentPage(() => num);
    }
  };

  let [idProduct, setIdProduct] = useState(0);

  const handleEdit = (id: number) => {
    // Implementar lógica de edición aquí
    onOpen();
    setIdProduct(id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Está seguro de que desea realizar esta acción?")) {
      // La acción se ejecutará si el usuario hace clic en "Aceptar"
      // Coloca aquí la lógica para ejecutar la acción que desea confirmar
      const found = data.find((e: any) => e.id === id);
      dispatch(actions.deleteProduct(found));
      dispatch(actions.getProductsPerPage(currentPage));
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <EditTable onClose={onClose} isOpen={isOpen} idProduct={idProduct} />

      <Flex direction="column" alignItems="center">
        <Tabla
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <Box display="flex" alignItems="baseline" justifyContent="space-around">
          <Button m="5" onClick={backPage}>
            Anterior
          </Button>
          <Text m="5">{currentPage}</Text>
          <Button m="5" onClick={nextPage}>
            siguiente
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default ProductsAdminPage;
