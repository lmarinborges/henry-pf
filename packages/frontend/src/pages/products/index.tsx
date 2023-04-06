import { Flex,Container, Radio, RadioGroup, Stack, Text, Button, Select } from "@chakra-ui/react";
import Card from "./card";
import { useDispatch,useSelector } from "react-redux";
import {RootState,AppDispatch} from '../../redux/store/index';
import { useEffect, useState } from "react";
import * as actions from "../../redux/actions/index";

export default function ProductsPage() {

    const [orderBy, setOrder] = useState("name");
    const [alphaOrder, setAlpha] = useState("asc");
    const [currentPage,setPage] =useState("1");
    const [brandFilter, setBrand]=useState(0);
    const [categoryFilter, setCategory]=useState(0);

    const dispatch:AppDispatch= useDispatch();
    

    useEffect(()=>{
        dispatch(actions.getAllProducts(orderBy,alphaOrder,currentPage,brandFilter,categoryFilter));
        dispatch(actions.getAllCategories());
        dispatch(actions.getAllBrands());
    },[dispatch,orderBy,alphaOrder,currentPage,brandFilter,categoryFilter]);

    const data= useSelector((state:RootState)=>state.products);
    const allItems= useSelector((state:RootState)=>state.totalItems);
    const cardsPerPage= useSelector((state:RootState)=>state.cardsForPages);
    const categories= useSelector((state:RootState)=>state.categories);
    const brands= useSelector((state:RootState)=>state.brands);

    var pageNumbers:Array<number>=[];
    
    const onClickPage=(e:any)=>{
        setPage(e)
    }

    const categoriesSelectChange= (e:any) =>{
        setCategory(Number(e.target.value))
    }

    const brandSelectChange= (e:any) =>{
        setBrand(Number(e.target.value))
    }

    for(var i=0;i<Math.ceil(allItems/cardsPerPage);i++){
        pageNumbers.push(i+1)
    }
    
    const pageButtons =pageNumbers.map((e,i)=>{
        return <Button color="red" size={"sm"} fontSize="20px" variant="ghost" onClick={()=>onClickPage(e)} value={currentPage} key={i}>{e}</Button>
    })

    const categoriesOptions=categories.map((e:any)=>{
        return <option key={e.id}value={e.id}>{e.name}</option>
    })
    
    const brandsOptions=brands.map((e:any)=>{
        return <option key={e.id} value={e.id}>{e.name}</option>
    })

    return (
        <Container bg={"black"}>
            
            <Text color={"white"} fontSize="18px" m="5px">Ordenar por Nombre o Precio :</Text>
            <RadioGroup onChange={setOrder} value={orderBy} defaultValue="name" >
                <Stack direction={"row"} justifyContent="center" spacing={"3"} >
                    <Radio colorScheme={"red"} textColor={"white"}value="name"><Text color={"white"}>Nombre</Text></Radio>
                    <Radio colorScheme={"red"} value="price"><Text color={"white"}>Precio</Text></Radio>
                </Stack>
            </RadioGroup>

            <Text color={"white"} fontSize="18px" m="5px">Orden ascendente o descendente :</Text>
            <RadioGroup  onChange={setAlpha}  value={alphaOrder} defaultValue="asc" >
                <Stack direction={"row"} justifyContent="center" spacing={"3"}>
                    <Radio colorScheme={"red"} value="asc" ><Text color={"white"}>A-Z  Min{"<"} Max</Text></Radio>
                    <Radio colorScheme={"red"} value="desc"><Text color={"white"}>Z-A  Max{">"}Min</Text></Radio>
                </Stack>
            </RadioGroup>

            <Select onChange={categoriesSelectChange} variant="filled" color="black" bg="white" colorScheme="blackAlpha" borderColor="red" mb="2" >
                <option value={Number(0)} key="0">Todas las categorias</option>
                {categoriesOptions}
            </Select>

            <Select  onChange={brandSelectChange} variant="filled" color="black" bg="white" colorScheme="blackAlpha" borderColor="red" mb="2" >
                <option value={Number(0)} key="0">Todas las Marcas</option>
                {brandsOptions}
            </Select>
        
            <Text m="10px" fontSize="20px" color="white">Productos: </Text>

            <Stack direction={"row"} justifyContent="center" spacing={4} >
                {pageButtons.length && 
                pageButtons}
            </Stack>
                

            <Flex alignItems="center" justifyContent="center" dir="row" wrap="wrap" >
            {data.map((e:any, i:any) => {
                return <Card key={i} product={e}></Card>;
            })}
            </Flex>
        </Container>
        
    );
}
