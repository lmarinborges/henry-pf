import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
} from "@chakra-ui/react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import * as actions from "../../../redux/actions/index";

export const EditTable = ({ isOpen, onClose, idProduct }: any) => {
  let dispatch: AppDispatch = useDispatch();
  let brands = useSelector((state: RootState) => state.brands);
  let categories = useSelector((state: RootState) => state.categories);

  interface Form {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    stock: number;
    brandId: number;
    categoryId: number;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm<Form>();

  let forReset = () => {
    onClose();
    reset();
  };

  let onSubmit = (data: Form) => {
    forReset()
    var category: any = "";
    if (data.categoryId) {
      categories.forEach((cat: any) => {
        if (cat.name == data.categoryId) {
          category = cat;
        }
      });
    }

    var brand: any = "";
    if (data.brandId) {
      brands.forEach((br: any) => {
        if (br.name == data.brandId) {
          brand = br;
        }
      });
    }
    // console.log({...data, brandId: brand.id, categoryId: category.id});
    dispatch(
      actions.patchProduct({
        ...data,
        brandId: brand.id ? brand.id : "",
        categoryId: category.id ? category.id : "",
      })
    );
  };

  useEffect(() => {
    dispatch(actions.getAllBrands());
    dispatch(actions.getAllCategories());
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Modifica tu producto</ModalHeader>
            <Button
              onClick={forReset}
              borderRadius="99999%"
              padding={0}
              _hover={{ bg: "gray.200" }}
              position="absolute"
              right="10px"
              cursor="pointer"
              top="8px"
              height="33px"
              minW="33px"
            >
              <RxCross2 size={22} />
            </Button>
            <ModalBody pb={6}>
              <VStack spacing={3}>
                <FormControl>
                  <FormLabel>id:</FormLabel>
                  <Input
                    {...register("id")}
                    value={idProduct}
                    cursor="initial"
                    readOnly
                    bg="#dfdfdf"
                    size="md"
                    borderRadius="none"
                    _focusVisible={{ borderRadius: "none" }}
                    _hover={{ borderColor: "none" }}
                    color="black"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Nombre:</FormLabel>
                  <Input
                    {...register("name")}
                    focusBorderColor="#00000059"
                    bg="#dfdfdf"
                    type="text"
                    size="md"
                    placeholder="nombre"
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{ borderColor: "gray.400" }}
                    color="black"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Descripcion:</FormLabel>
                  <Input
                    {...register("description")}
                    focusBorderColor="#00000059"
                    bg="#dfdfdf"
                    type="text"
                    size="md"
                    placeholder="descripcion"
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{ borderColor: "gray.400" }}
                    color="black"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Imagen:</FormLabel>
                  <Input
                    {...register("imageUrl")}
                    focusBorderColor="#00000059"
                    bg="#dfdfdf"
                    type="text"
                    size="md"
                    placeholder="url de la imagen"
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{ borderColor: "gray.400" }}
                    color="black"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Precio:</FormLabel>
                  <Input
                    {...register("price")}
                    focusBorderColor="#00000059"
                    bg="#dfdfdf"
                    type="number"
                    size="md"
                    placeholder="precio"
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{ borderColor: "gray.400" }}
                    color="black"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Stock:</FormLabel>
                  <Input
                    {...register("stock")}
                    focusBorderColor="#00000059"
                    bg="#dfdfdf"
                    type="number"
                    size="md"
                    placeholder="stock"
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{ borderColor: "gray.400" }}
                    color="black"
                  />
                </FormControl>

                <FormLabel>Categorias:</FormLabel>
                <Select
                  {...register("categoryId")}
                  placeholder="Seleccionar categoria"
                  bg="#dfdfdf"
                >
                  {categories &&
                    categories.map((b: any, i: any) => {
                      return <option key={i}>{b.name}</option>;
                    })}
                </Select>

                <FormLabel>Marcas:</FormLabel>
                <Select
                  {...register("brandId")}
                  placeholder="Seleccionar marca"
                  bg="#dfdfdf"
                >
                  {brands &&
                    brands.map((b: any, i: any) => (
                      <option key={i}>{b.name}</option>
                    ))}
                </Select>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isDisabled={!formState.isDirty /*|| !formState.isValid*/}
              >
                Guardar
              </Button>
              <Button onClick={forReset}>Cancelar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
