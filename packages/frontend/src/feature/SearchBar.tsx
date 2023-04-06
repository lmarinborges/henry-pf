import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";

export const SearchBar = () => {
  return (
    <>
      <Flex justifyContent="center">
        <Flex
          align="center"
          border="1px"
          borderColor="gray.500"
          borderRadius="17px"
          alignItems="center"
          pl={4}
          pr={2}
          bg="white"
        >
          <Input
            focusBorderColor="transparent"
            borderColor="transparent"
            bgColor="transparent"
            p="0px"
            placeholder="¿Que deseas buscar?"
            _hover={{ borderColor: "none" }}
            size={{ base: "lg" }}
          />
          <Button
            p="10px"
            background="transparent"
            color="#00c3ab"
            borderRadius="99999px"
            _hover={{ bg: "gray.300" }}
            bg="gray.200"
          >
            <GoSearch />
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
