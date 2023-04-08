import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import {
  getAllBrands,
  getAllCategories,
  createProduct,
} from "../../redux/actions";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface CreateProductFormData {
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  stock: number;
  brandId: number;
  categoryId: number;
}

type Inputs = {
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  stock: number;
  brandId: number;
  categoryId: number;
};

type Brand = {
  id: string;
  name: string;
  description: string;
};

type Category = {
  id: string;
  name: string;
  description: string;
};

export default function CreateProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  //estado
  const [product, setProduct] = useState<CreateProductFormData>({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    stock: 0,
    brandId: 0,
    categoryId: 0,
  });

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, [dispatch]);

  // let brands = useSelector<RootState, Brand[]>(state => state.brands) as Brand[]
  // let categories = useSelector<RootState, Category[]>(state => state.categories) as Category[]
  const brands = useSelector((state: RootState) => state.brands);
  const categories = useSelector((state: RootState) => state.categories);

  var property: string;
  const handleProductChange = (e: any) => {
    var value: any;
    if (
      e.target.name === "brandId" ||
      e.target.name === "categoryId" ||
      e.target.name === "stock"
    ) {
      property = e.target.name;
      value = Number(e.target.value);
    } else {
      property = e.target.name;
      value = e.target.value;
    }
    setProduct({
      ...product,
      [property]: value,
    });
  };

  const isNameInvalid = errors.name ? true : false;
  const isDescriptionInvalid = errors.description ? true : false;
  const isImageInvalid = errors.imageUrl ? true : false;
  // const isPriceInvalid = errors.price ? true : false;
  // const isStockInvalid = errors.stock ? true : false;
  // const isBrandInvalid = errors.brandId ? true : false;
  // const isCategoryInvalid = errors.categoryId ? true : false;

  const toast = useToast();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    dispatch(createProduct(product));
    toast({
      title: "Felicidades",
      description: "Ha agregado un nuevo producto en su lista",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setProduct({
      name: "",
      description: "",
      imageUrl: "",
      price: "",
      stock: 0,
      brandId: 0,
      categoryId: 0,
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"left"} px={2}>
          <Heading fontSize={"4xl"}>Agrega tus productos fácilmente!</Heading>
          <Text fontSize={"lg"} color={"gray.600"} px={1}>
            completa los datos de tus productos y vende más! 📦
          </Text>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl isInvalid={isNameInvalid}>
                <FormLabel>Nombre del producto:</FormLabel>
                <Input
                  {...register("name", { required: true })}
                  placeholder="Ingrese el nombre de su producto..."
                  value={product.name}
                  name="name"
                  onChange={handleProductChange}
                  autoComplete="off"
                />
                {errors.name && (
                  <FormHelperText color="red.300">
                    Requiere que el producto lleve un nombre
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl id="description" isInvalid={isDescriptionInvalid}>
                <FormLabel>Descripción:</FormLabel>
                <Textarea
                  {...register("description", { required: true })}
                  placeholder="Breve descripcion de su producto..."
                  value={product.description}
                  name="description"
                  onChange={handleProductChange}
                />
                {errors.description && (
                  <FormHelperText color="red.300">
                    Ingrese una breve descripcion de su producto
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl id="imageUrl" isInvalid={isImageInvalid}>
                <FormLabel>Agregue una imagen de su producto:</FormLabel>
                <Input
                  {...register("imageUrl", { required: true })}
                  placeholder="https://..."
                  name="imageUrl"
                  value={product.imageUrl}
                  onChange={handleProductChange}
                  type="file"
                />
                {errors.imageUrl && (
                  <FormHelperText color="red.300">
                    Debe ingresar una imagen de su producto
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl id="price">
                <FormLabel>Precio:</FormLabel>
                <Input
                  autoComplete="off"
                  {...register("price", { required: true })}
                  placeholder="Ingrese el precio del producto"
                  value={product.price}
                  name="price"
                  onChange={handleProductChange}
                />
                {!/^([0-9])*$/.test(product.price) && (
                  <FormHelperText color="red.300">
                    Ingrese sólo caracteres númericos
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl id="stock">
                <FormLabel>Stock:</FormLabel>
                <Input
                  autoComplete="off"
                  {...register("stock", { required: true })}
                  value={product.stock}
                  name="stock"
                  onChange={handleProductChange}
                />
                {errors.stock && (
                  <FormHelperText color="red.300">
                    Debe ingresar el stock disponible del producto
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl id="brandId">
                <FormLabel>Selecciona la marca de tu producto:</FormLabel>
                <Select
                  {...register("brandId", { required: true })}
                  placeholder="Marca del producto"
                  value={product.brandId}
                  name="brandId"
                  onChange={handleProductChange}
                >
                  {brands.length > 0 &&
                    brands.map((e: Brand, i: number) => {
                      return (
                        <option key={i} value={e.id}>
                          {e.name}
                        </option>
                      );
                    })}
                </Select>
                {errors.brandId && (
                  <FormHelperText color="red.300">
                    Es necesario que seleccione una marca de su producto o la
                    cree
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl id="categoryId">
                <FormLabel>Selecciona la categoria del tu producto:</FormLabel>
                <Select
                  {...register("categoryId", { required: true })}
                  placeholder="Categorias"
                  value={product.categoryId}
                  name="categoryId"
                  onChange={handleProductChange}
                >
                  {categories.length > 0 &&
                    categories.map((e: Category, i: number) => {
                      return (
                        <option key={i} value={e.id}>
                          {e.name}
                        </option>
                      );
                    })}
                </Select>
                {errors.categoryId && (
                  <FormHelperText color="red.300">
                    Es necesario que seleccione la categoria de su producto o la
                    cree
                  </FormHelperText>
                )}
              </FormControl>

              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={"red.300"}
                  color={"grey.300"}
                  mt={8}
                  _hover={{
                    bg: "#E6E6E6",
                    color: "red.600",
                  }}
                >
                  Agrega nuevo producto
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
