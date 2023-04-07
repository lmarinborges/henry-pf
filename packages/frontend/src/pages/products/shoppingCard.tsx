import {
  Container,
  Text,
  Button,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ShoppingCard(props: any) {
  const [totalProduct, setTotalProduct] = useState(props.product.price);
  const price = Number(props.product.price);

  const handleNumChange = (e: any) => {
    if (e * price <= totalProduct) {
      let val = price;
      props.totalValue(val, true);
    } else {
      let val = price;
      props.totalValue(val, false);
    }
    setTotalProduct(e * props.product.price);
  };

  return (
    <Stack
      mr="20px"
      mb="20px"
      mt="20px"
      spacing="2"
      p="10px"
      pr="0"
      key={props.product.id}
      bg="gray.400"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      border="black"
    >
      <Container
        ml="0"
        pl="0"
        mr="0"
        mb="0"
        display="flex"
        flexDirection="row"
        justifyContent={"right"}
      >
        <Button
          colorScheme="red"
          size={"sm"}
          w={"1"}
          onClick={() => props.onClose(props.product.name)}
        >
          X
        </Button>
      </Container>
      <Text>Nombre: {props.product.name}</Text>
      <Text>Stock: {props.product.stock}</Text>
      <Text>Precio por unidad: ${props.product.price}</Text>
      <Container ml="0" pl="0" display="flex" flexDirection="row" centerContent>
        <Text mr="5%">Cantidad:</Text>
        <NumberInput
          size="md"
          w="50%"
          step={1}
          defaultValue={1}
          min={1}
          max={props.product.stock}
          onChange={(e) => handleNumChange(e)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Container>
      <Container
        ml="0"
        pl="0"
        display="flex"
        flexDirection="row"
        justifyContent={"space-between"}
        centerContent
      >
        <Text>Total: ${Number(totalProduct).toFixed(2)}</Text>
        <Button size={"md"} variant="solid" colorScheme="red">
          Comprar
        </Button>
      </Container>
    </Stack>
  );
}
