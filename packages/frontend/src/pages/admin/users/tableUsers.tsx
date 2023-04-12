import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store/";
import { getAllUsers } from "../../../redux/actions";
import { useEffect, useState } from "react";
import TablaDinamica from "./DinamicTable";
import { Box, Button, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import ModalEdit from "./modalEdit";



export default function TableUsers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [valorModal, setValorModal] = useState(null);

  function abrirModal(valor: any) {
    setValorModal(valor);
    onOpen();
  }
  const acciones = [
    {
      onclick: abrirModal,
      icon: (
        <Button colorScheme="yellow" p={0}>
          <Icon as={AiFillEdit} w={6} h={6} color="black" />
        </Button>
      ),
    },

  ];

  const dispatch: AppDispatch = useDispatch();
  //const data = useSelector((state: RootState) => [...state.adminProducts]);
  const data = useSelector((state: RootState) => [...state.users]);
  const edited = useSelector((state: RootState) => state.userEdited);
  //condiciones de filtrado size es 5 por defecto pero mejor le pongo 7
  const [conditions, setConditions] = useState({
    page: 1,
    size: 7,
  });

  useEffect(() => {
    dispatch(getAllUsers(conditions));
  }, [conditions]);

  useEffect(() => {
    dispatch(getAllUsers(conditions));
  }, [edited]);
  const backPage = () => {
    if (conditions.page > 1) {
      setConditions({ ...conditions, page: conditions.page - 1 });
    }
  };
  //por ahora le puse una condicion temporal siempre y cuando los usuarios no sean multiplos de size
  const nextPage = () => {
    if (data.length < conditions.size) {
    } else {
      setConditions({ ...conditions, page: conditions.page + 1 });
    }
  };
  const renderizado = (data: any) => {
    if (data && data.length > 1) {
      return (
        <Box mx={"auto"} w={"80vw"}>
          <ModalEdit
            isOpen={isOpen}
            onClose={onClose}
            valorModal={valorModal}
          />
          <TablaDinamica data={data} acciones={acciones} />
          <Box
            display="flex"
            alignItems="baseline"
            justifyContent="space-around"
          >
            <Button m="5" isDisabled={conditions.page == 1} onClick={backPage}>
              Anterior
            </Button>
            <Text m="5">{conditions.page}</Text>
            <Button
              m="5"
              isDisabled={data.length < conditions.size}
              onClick={nextPage}
            >
              Siguiente
            </Button>
          </Box>
        </Box>
      );
    } else {
      return <div>no hay nada</div>;
    }
  };
  return renderizado(data);
}
