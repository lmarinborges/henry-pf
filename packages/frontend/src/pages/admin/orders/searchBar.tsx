import { Button, Flex, FormControl, Input } from "@chakra-ui/react";

import { Form } from "react-router-dom";
import axios from "../../../libs/axios";



export const SearchBar = ({onSubmit}:any) => {
    return (
        <Form onSubmit={onSubmit}>
            <Flex>
                <Input mr="5" name='search'></Input>
                <Button type="submit">Buscar</Button>
            </Flex>
        </Form>
    );
};
