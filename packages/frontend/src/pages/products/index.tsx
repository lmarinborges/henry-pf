import { Flex } from "@chakra-ui/react";
import Card from "./card";

const data = [
    {
        isNew: true,
        imageURL:
            "https://http2.mlstatic.com/D_NQ_NP_2X_746024-MLA48945892843_012022-F.webp",
        name: "Whey Protein",
        price: 4.5,
        rating: 4.5,
        numReviews: 34,
    },
    {
        isNew: true,
        imageURL:
            "https://http2.mlstatic.com/D_NQ_NP_2X_709580-MLA46968678890_082021-F.webp",
        name: "Disco Engomado Olimpico",
        price: 4.5,
        rating: 2.5,
        numReviews: 34,
    },
    {
        isNew: true,
        imageURL:
            "https://http2.mlstatic.com/D_NQ_NP_2X_746024-MLA48945892843_012022-F.webp",
        name: "Whey Protein",
        price: 4.5,
        rating: 4.5,
        numReviews: 34,
    },
    {
        isNew: true,
        imageURL:
            "https://http2.mlstatic.com/D_NQ_NP_2X_709580-MLA46968678890_082021-F.webp",
        name: "Disco Engomado Olimpico",
        price: 4.5,
        rating: 2.5,
        numReviews: 34,
    },
];

export default function ProductsPage() {
    return (
        <Flex alignItems="center" justifyContent="center" dir="row" wrap="wrap" >
            {data.map((e) => {
                return <Card product={e}></Card>;
            })}
        </Flex>
    );
}
