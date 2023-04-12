import {
  Flex,
  Container,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Button,
  Select,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "./card";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/index";
import { useEffect, useState } from "react";
import * as actions from "../../redux/actions/index";
import { SearchBar } from "../../feature/searchBar/SearchBar";

export default function ProductsPage() {
  const [orderBy, setOrder] = useState("name");
  const [alphaOrder, setAlpha] = useState("asc");
  const [currentPage, setPage] = useState("1");
  const [brandFilter, setBrand] = useState(0);
  const [categoryFilter, setCategory] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  const search = useSelector((state: RootState) => state.search);

  useEffect(() => {
    dispatch(
      actions.getAllProducts(
        orderBy,
        alphaOrder,
        currentPage,
        brandFilter,
        categoryFilter,
        search
      )
    );
    dispatch(actions.getAllCategories());
    dispatch(actions.getAllBrands());
  }, [
    dispatch,
    orderBy,
    alphaOrder,
    currentPage,
    brandFilter,
    categoryFilter,
    search,
  ]);

  const data = useSelector((state: RootState) => state.products);
  const allItems = useSelector((state: RootState) => state.totalItems);
  const cardsPerPage = useSelector((state: RootState) => state.cardsForPages);
  const categories = useSelector((state: RootState) => state.categories);
  const brands = useSelector((state: RootState) => state.brands);

  var pageNumbers: Array<number> = [];

  const onClickPage = (e: any) => {
    setPage(e);
  };

  const categoriesSelectChange = (e: any) => {
    setCategory(Number(e.target.value));
  };

  const brandSelectChange = (e: any) => {
    setBrand(Number(e.target.value));
  };

  for (var i = 0; i < Math.ceil(allItems / cardsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  const pageButtons = pageNumbers.map((e, i) => {
    return (
      <Button
        color="red"
        size={"sm"}
        fontSize="20px"
        variant="ghost"
        onClick={() => onClickPage(e)}
        value={currentPage}
        key={i}
      >
        {e}
      </Button>
    );
  });

  const categoriesOptions = categories.map((e: any) => {
    return (
      <option key={e.id} value={e.id}>
        {e.name}
      </option>
    );
  });

  const brandsOptions = brands.map((e: any) => {
    return (
      <option key={e.id} value={e.id}>
        {e.name}
      </option>
    );
  });

  return (
    <Container 
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box 
        bg={useColorModeValue("gray.50", "gray.800")}
        pt="10px" 
        pb="0px" 
        mb="-20px"
      >
        <SearchBar />
      </Box>

      <Text fontSize="18px" m="5px">
        Ordenar por Nombre o Precio:
      </Text>
      <RadioGroup onChange={setOrder} value={orderBy} defaultValue="name">
        <Stack direction={"row"} justifyContent="center" spacing={"3"}>
          <Radio colorScheme={"red"} textColor={"Black"} value="name">
            <Text>Nombre</Text>
          </Radio>
          <Radio colorScheme={"red"} value="price">
            <Text>Precio</Text>
          </Radio>
        </Stack>
      </RadioGroup>

      <Text fontSize="18px" m="5px">
        Orden ascendente o descendente:
      </Text>
      <RadioGroup onChange={setAlpha} value={alphaOrder} defaultValue="asc">
        <Stack direction={"row"} justifyContent="center" spacing={"3"}>
          <Radio colorScheme={"red.300"} value="asc">
            <Text>A-Z Min{"<"} Max</Text>
          </Radio>
          <Radio colorScheme={"red.300"} value="desc">
            <Text>Z-A Max{">"}Min</Text>
          </Radio>
        </Stack>
      </RadioGroup>

      <Select
        onChange={categoriesSelectChange}
        variant="filled"
        color="black"
        bg="white"
        borderColor="red"
        _hover={{ bg: "red.300", color:"white" }}
        focusBorderColor="gray.50"
        mb="2"
      >
        <option value={Number(0)} key="0">
          Todas las categorias
        </option>
        {categoriesOptions}
      </Select>

      <Select
        onChange={brandSelectChange}
        variant="filled"
        color="black"
        bg="white"
        borderColor="red"
        _hover={{ bg: "red.300", color:"white" }}
        focusBorderColor="gray.50"
        mb="2"
      >
        <option value={Number(0)} key="0">
          Todas las Marcas
        </option>
        {brandsOptions}
      </Select>

      <Text m="10px" fontSize="20px">
        Productos:{" "}
      </Text>

      <Stack direction={"row"} justifyContent="center" spacing={4}>
        {pageButtons.length && pageButtons}
      </Stack>

      <Flex alignItems="center" justifyContent="center" dir="row" wrap="wrap">
        {data.map((e: any, i: any) => {
          return <Card key={i} product={e}></Card>;
        })}
      </Flex>
    </Container>
  );
}
