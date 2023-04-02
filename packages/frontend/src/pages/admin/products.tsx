import { Flex } from "@chakra-ui/react";
import Card from "../products/card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsAdminPage() {
  const [Allproducts, setAllProducts] = useState({
    totalItems: "",
    pageSize: "",
    products: [],
  });

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setAllProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchproducts();
  }, []);

  return (
    <Flex alignItems="center" justifyContent="center" dir="row" wrap="wrap">
      {Allproducts.products.map((e) => {
        e = { ...e, price: parseFloat(e.price), rating: 4.5, numReviews: 34 };
        return <Card product={e} key={e.id}></Card>;
      })}
    </Flex>
  );
}
