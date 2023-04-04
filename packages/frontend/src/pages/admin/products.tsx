import React from "react";
import Tabla from "./Table";
import {Flex} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/index";
import { useEffect, useState } from "react";
import * as actions from "../../redux/actions/index";

const ProductsAdminPage = () => {
    const [orderBy, setOrder] = useState("name");
    const [alphaOrder, setAlpha] = useState("asc");
    const [currentPage, setPage] = useState("1");
    const [brandFilter, setBrand] = useState(0);
    const [categoryFilter, setCategory] = useState(0);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getAllCategories());
        dispatch(actions.getAllBrands());
        dispatch(
            actions.getAllProducts(
                orderBy,
                alphaOrder,
                currentPage,
                brandFilter,
                categoryFilter
            )
        );
    }, [
        dispatch,
        orderBy,
        alphaOrder,
        currentPage,
        brandFilter,
        categoryFilter,
    ]);

    const data = useSelector((state: RootState) => state.products);
    const allItems = useSelector((state: RootState) => state.totalItems);
    const cardsPerPage = useSelector((state: RootState) => state.cardsForPages);
    const categories = useSelector((state: RootState) => state.categories);
    const brands = useSelector((state: RootState) => state.brands);

    return (
        <Flex justifyContent="center">
            <Tabla data={data} />;
        </Flex>
    );
};

export default ProductsAdminPage;
