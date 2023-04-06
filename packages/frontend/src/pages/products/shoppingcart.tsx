import { Box, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import ShoppingCard from "./shoppingCard";

export default function ShoppingCart() {
  const [totalPrice, setTotalPrice] = useState(0);

  var storage: Array<any> = [];

  for (var i = 0; i < localStorage.length; i++) {
<<<<<<< HEAD
    if (localStorage.key(i)?.includes("chakra") !== true) {
=======
    if (localStorage.key(i)?.includes("-") !== true) {
>>>>>>> 5614a70 (style: format project with prettier)
      storage.push(localStorage.key(i));
    }
  }

  const products = storage.map((e) => {
    let prod = localStorage.getItem(e);
    if (prod !== null) {
      return JSON.parse(prod);
    } else return null;
  });

<<<<<<< HEAD
  useEffect(() => {
    if (totalPrice === 0) {
      var init: number = 0;
      products.forEach((e) => {
        init += Number(e.price);
      });
      setTotalPrice(init);
    }
  }, [totalPrice, products]);

=======
>>>>>>> 5614a70 (style: format project with prettier)
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

  const onClose = (name: string) => {
    localStorage.removeItem(name);
    window.location.reload();
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

  return (
    <Box bg="black" padding="10px" m="0%">
      <Heading color="white">Carrito:</Heading>
      {totalCards}
      <Text color="white">Total: ${totalPrice.toFixed(2)}</Text>
    </Box>
  );
}
