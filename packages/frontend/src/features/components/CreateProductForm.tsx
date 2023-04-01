import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

const validateUrl = (value: any) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch (e) {
    return false;
  }
};

export default function CreateProductForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Add your products easily!</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            complete the data of your products and sell more! 📦
          </Text>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("name", { required: true })}
                  placeholder="Enter the name of your product..."
                />
                <FormHelperText>
                  Requires the product to bear a name
                </FormHelperText>
              </FormControl>

              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description", { required: true })}
                  placeholder="Describe your product..."
                />
                <FormHelperText>
                  Requires the product to carry a brief description
                </FormHelperText>
              </FormControl>

              <FormControl id="url" isInvalid={errors.url} isRequired>
                <FormLabel>Enter the url of the article</FormLabel>
                <Input
                  {...register("url", {
                    required: true,
                    validate: validateUrl,
                  })}
                  placeholder="https://..."
                />
                <FormHelperText>
                  You only need a URL. Example: https://www.ahem...
                </FormHelperText>
              </FormControl>

              <FormControl id="price">
                <FormLabel>Price</FormLabel>
                <Input {...register("price", { required: true })} />
                <FormHelperText>
                  Requires the product to bear a name
                </FormHelperText>
              </FormControl>

              <FormControl id="stock">
                <FormLabel>Stock</FormLabel>
                <Input
                  {...register("stock", { required: true })}
                  placeholder="Enter the available stock of your product..."
                />
                <FormHelperText>Enter the price of the product</FormHelperText>
              </FormControl>

              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={"red.400"}
                  color={"black"}
                  mt={8}
                  _hover={{
                    bg: "#E6E6E6",
                  }}
                >
                  Add product
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
