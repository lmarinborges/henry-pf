import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store/";
import { getAllUsers } from "../../../redux/actions";
import { useEffect, useState } from "react";
import TablaDinamica from "./DinamicTable";
import { Box, Button, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import ModalEdit from "./modalEdit";

/*const CompVerCertificado = (props: any) => {
    console.log(props);
  
    return <Link to={"/user/certificado/" + props.id}>Ver Mass </Link>;
  };
  
  const columnas = [
    {
      nombre: "certificados",
      componente: ({ id }: { id: any }) => <CompVerCertificado id={id} />,
    },
  ];*/

const dato = [
  {
    "Numero de item": 1,
    titulo: "titulo1",
    autor: "autor1",
    categoria: "categoria 1",
    precio: "10.00",
    fecha_de_compra: "20 march 2020",
  },
  {
    "Numero de item": 2,
    titulo: "titulo2",
    autor: "autor2",
    categoria: "categoria 2",
    precio: "15.00",
    fecha_de_compra: "10 april 2020",
  },
];
export default function TableUsers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [valorModal, setValorModal] = useState(null);

  function abrirModal(valor: any) {
    setValorModal(valor);
    onOpen();
  }
  function Editando(valor: any) {
    console.log("Editando", valor);
  }

  function Borrando(valor: any) {
    console.log("borrendo", valor);
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
    {
      onclick: Borrando,
      icon: (
        <Button colorScheme="blue" p={0}>
          <Icon as={FiTrash2} w={6} h={6} color="black" />
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
