import { Box, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

import ShoppingCard from "./shoppingCard";

export default function ShoppingCart(){
    const [totalPrice,setTotalPrice]=useState(0);

    var storage:Array<any>=[];


    for(var i=0;i<localStorage.length;i++){
        if(localStorage.key(i)?.includes("-")!==true)
        {
            storage.push(localStorage.key(i))
        }
    };
    
    const products=storage.map((e)=>{
        let prod=localStorage.getItem(e);
        if(prod!==null){
            return JSON.parse(prod)
        }
        else return null
    });

    const totalValue=(val:number,rest:boolean)=>{
        let result=0
        if(rest===true){
            result=(totalPrice-val)    
            setTotalPrice(result)
        }
        else {
            result=Number(totalPrice)+val;
            setTotalPrice(result)
        } 
    };

    const onClose= (name:string) => {
        localStorage.removeItem(name);
        window.location.reload()
    }

    var totalCards=products.map((e,i)=>{
        return <ShoppingCard key={i} product={e} totalValue={totalValue} onClose={onClose}/>
    });
    
    
    return (
        <Box bg="black" padding="10px" m="0%">
            <Heading color="white">Carrito:</Heading>
            {totalCards}
            <Text color="white">Total: ${totalPrice.toFixed(2)}</Text>
        </Box>
    )
}