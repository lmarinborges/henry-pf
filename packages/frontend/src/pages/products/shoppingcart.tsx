import { Box, Heading, Text,Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import ShoppingCard from "./shoppingCard";

export default function ShoppingCart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts,setTotalProducts]=useState<any[]>([])

  var storage: Array<any> = [];

  const onClose = (name: string, price:number) => {
    localStorage.removeItem(name);
    setTotalPrice(totalPrice-price)

  };

  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)?.includes("chakra") !== true) {
      storage.push(localStorage.key(i));
    }
  }

  const products = storage.map((e) => {
    let prod = localStorage.getItem(e);
    if (prod !== null) {
      return JSON.parse(prod);
    } else return null;
  });

  const totalValue = (val: number, rest: boolean) => {
    let result = 0;
    if (rest === true) {
      result = totalPrice - val;
      setTotalPrice(result);
    } else {
      result = Number(totalPrice) + val;
      setTotalPrice(result);
    }
  };


  var totalCards = products.map((e, i) => {
    return (
      <ShoppingCard
        key={i}
        product={e}
        totalValue={totalValue}
        onClose={onClose}
      />
    );
  });

  useEffect(() => {
    setTotalProducts(totalCards)
    var init: number = 0;
    if (totalPrice === 0) {
      products.forEach((e) => {
        init += Number(e.price);
      });
      setTotalPrice(init);
    }
  }, [totalPrice, products, totalCards]);

  return (
    <Box bg="white" p="10px"mt="-10px" >
      <Heading color="black">Carrito:</Heading>
      { totalProducts.length!==0? totalProducts : <Text display={"flex"} alignItems="center" justifyContent={"center"} fontStyle="bold"> El Carrito está vacío</Text>}
      <Text color="black">Total: ${totalPrice.toFixed(2)}</Text>
      <Button size={"md"} variant="solid" colorScheme="red">
          Comprar
        </Button>
    </Box>
  );
}
