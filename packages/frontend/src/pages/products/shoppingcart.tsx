import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RootState, AppDispatch } from "../../redux/store/index";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCard from "./shoppingCard";
import * as actions from "../../redux/actions/index";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("TEST-dba7b71f-83c4-4d78-aeac-dea0417525b0");

export default function ShoppingCart() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProducts, setTotalProducts] = useState<any[]>([]);
    const [buyProducts, setBuyProducts] = useState<any>();

    const mercadoRes = useSelector((state: RootState) => state.mercadoRes);
    const user = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch<AppDispatch>();

    var storage: Array<any> = [];

    const onClose = (name: string, price: number) => {
        localStorage.removeItem(name);
        setTotalPrice(totalPrice - price);
    };

    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i)?.includes("CartProduc") === true) {
            storage.push(localStorage.key(i));
        }
    }

    const products = storage.map((e) => {
        let prod = localStorage.getItem(e);
        if (prod !== null) {
            return JSON.parse(prod);
        } else return null;
    });

    const onBuy = () => {
        console.log(buyProducts);
        dispatch(actions.buyCart(buyProducts));
    };

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

    const setQuantity = (i: number, rest: boolean) => {
        let provitional;
        console.log(i);
        if (rest === true) {
            provitional = buyProducts.buyedProducts[i].quantity--;
            setBuyProducts({
                ...buyProducts,
                buyedProducts: [
                    ...buyProducts.buyedProducts,
                    (buyProducts.buyedProducts[i].quantity = provitional),
                ],
            });
        } else {
            if (buyProducts?.buyedProducts[i]) {
                provitional = buyProducts.buyedProducts[i].quantity++;
                console.log(provitional);
                setBuyProducts({
                    ...buyProducts,
                    buyedProducts: [
                        ...buyProducts.buyedProducts,
                        (buyProducts.buyedProducts[i].quantity = provitional),
                    ],
                });
            }
        }
    };

    var totalCards = products.map((e, i) => {
        console.log(i);
        return (
            <ShoppingCard
                key={i}
                id={i}
                product={e}
                totalValue={totalValue}
                onClose={onClose}
                setQuantity={setQuantity}
            />
        );
    });

    useEffect(() => {
        var init: number = 0;
        if (totalPrice === 0) {
            setTotalProducts(totalCards);
            products.forEach((e) => {
                init += Number(e.price);
            });

            if (user.id) {
                const buyedProducts = products.map((e) => {
                    return {
                        name: e.name,
                        price: e.price,
                        productId: e.id,
                        quantity: 1,
                    };
                });
                const initBuy = {
                    userId: user?.id,
                    total: Number(init),
                    buyedProducts,
                };
                setBuyProducts(initBuy);
            }
            setTotalPrice(init);
        }
    }, [totalPrice, products, totalCards, user.id]);
    
    return (
        <Box p="10px" mt="-10px" minH="100vh" m="auto" maxW={'800px'} >
            <Flex direction={'column'}  >
                <Heading>Carrito:</Heading>
                {totalProducts.length !== 0 ? (
                    totalProducts
                ) : (
                    <Text
                        display={"flex"}
                        alignItems="center"
                        justifyContent={"center"}
                        fontStyle="bold"
                    >
                        {" "}
                        El Carrito está vacío
                    </Text>
                )}
                <Text fontSize={'xl'} my='20px' fontWeight={600}>Total: ${totalPrice.toFixed(2)}</Text>
                <Button
                    size={"md"}
                    variant="solid"
                    onClick={onBuy}
                    colorScheme="red"
                    minW='10rem'
                    width={'40%'}
                    m='auto'
                >
                    Comprar
                </Button>
                {mercadoRes.global !== "" && (
                    <Wallet
                        initialization={{ preferenceId: mercadoRes.global }}
                    />
                )}
            </Flex>
        </Box>
    );
}
