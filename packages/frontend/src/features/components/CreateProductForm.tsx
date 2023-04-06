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
} from "@chakra-ui/react";
import { getAllBrands, getAllCategories, createProduct } from '../../redux/actions';
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";

interface CreateProductFormData {
  name: string;
  description: string;
  imageUrl: string,
  price: string;
  stock: number,
  brandId: number;
  categoryId: number
};

type Brand = {
  id: string,
	name: string,
	description: string
};

type Category = {
  id: string,
	name: string,
	description: string
};

export default function CreateProductForm() {
  
  //estado
  const [product, setProduct] = useState<CreateProductFormData>({
    name: '',
    description: '',
    imageUrl: '',
    price: '',
    stock: 0,
    brandId: 0,
    categoryId: 0
  });

  const dispatch : AppDispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, [dispatch])

  // let brands = useSelector<RootState, Brand[]>(state => state.brands) as Brand[]
  // let categories = useSelector<RootState, Category[]>(state => state.categories) as Category[]
  const brands= useSelector((state:RootState)=>state.brands);
  const categories= useSelector((state:RootState)=>state.categories);
  

  var property: string;
  const handleProductChange = ( e : any)=>{
    var value: any;
    if(e.target.name === 'brandId' || e.target.name === 'categoryId' || e.target.name === 'stock'){
      property = e.target.name;
      value = Number(e.target.value);
    } else {
      property = e.target.name;
      value = e.target.value;
    }
    setProduct({
      ...product,
      [property]:value
    })
  }
  
  const submitHandler = ( e : any ) => {
    console.log(product);
    e.preventDefault();
    dispatch(createProduct(product));
    alert("el producto se creo con exitoo wacho");
    setProduct({
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      stock: 0,
      brandId: 0,
      categoryId: 0
    })
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
        <form onSubmit={submitHandler}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel>Name:</FormLabel>
                <Input
                  placeholder="Ingrese el nombre de su producto..."
                  value={product.name}
                  name="name"
                  onChange={handleProductChange}
                />
              </FormControl>

              <FormControl id="description">                
                <FormLabel>Descripción:</FormLabel>
                <Textarea
                  placeholder="Breve descripcion de su producto..."
                  value={product.description}
                  name="description"
                  onChange={ handleProductChange}
                />
                <FormHelperText>
                  Requiere que el producto lleve una descripción breve
                </FormHelperText>
              </FormControl>

              <FormControl id="url" isRequired>
                <FormLabel>Agregue una imagen de su producto:</FormLabel>
                <Input                 
                  placeholder="https://..."
                  name="imageUrl"
                  value={product.imageUrl}
                  onChange={ handleProductChange}
                  type="file"
                />
              </FormControl>

              <FormControl id="price">
                <FormLabel>Price:</FormLabel>
                <Input
                  placeholder="Ingrese el precio del producto"
                  value={product.price}
                  name="price"
                  onChange={ handleProductChange}
                />
              </FormControl>

              <FormControl id="stock">
                <FormLabel>Stock:</FormLabel>
                <Input
                  placeholder="Enter the available stock of your product..."
                  value={product.stock}
                  name="stock"
                  onChange={ handleProductChange}
                />
                <FormHelperText>Ingrese el stock disponible de su producto...</FormHelperText>
              </FormControl>

              <FormControl id="brand">
                <FormLabel>Selecciona la marca de tu producto:</FormLabel>
                <Select 
                  placeholder="Marca del producto"
                  value={product.brandId}
                  name="brandId"
                  onChange={ handleProductChange}
                  >
                  {brands.length > 0 &&
                      brands.map((e: Brand, i: number)=>{
                          return <option key={i} value={e.id}>{e.name}</option>
                      })
                      }
                  </Select>
                <FormHelperText>
                  Si la marca de tu producto no aparece, agrégala aquí
                  </FormHelperText>
              </FormControl>

              <FormControl id="category">
                <FormLabel>Selecciona la categoria del tu producto:</FormLabel>
                  <Select 
                    placeholder="Categorias"
                    value={product.categoryId}
                    name="categoryId"
                    onChange={ handleProductChange}
                    >
                   {categories.length > 0 &&
                    categories.map((e: Category, i:number)=>{
                        return <option key={i} value={e.id}>{e.name}</option>
                    })
                    }
                  </Select>
                  <FormHelperText>
                    Si la marca de tu producto no aparece, agrégala aquí
                </FormHelperText>
              </FormControl>

              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={"red.400"}
                  color={"black"}
                  mt={8}
                  _hover={{
                    bg: "#E6E6E6",
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
