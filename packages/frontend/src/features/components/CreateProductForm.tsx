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
  FormErrorMessage,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

const validateUrl = (value: any) => {
  try {
    const url = new URL(value);
    console.log(url.protocol);

    return url.protocol === "https:";
  } catch (e) {
    console.log(e);

    return false;
  }
};

function validateImage(file: File[]) {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  if (!allowedExtensions.exec(file[0].name)) {
    alert("Only images with .jpg, .jpeg, .png or .gif extension are allowed.");
    return false;
  } else if (file[0].size > 5242880) {
    alert("File size should not exceed 5MB.");
    return false;
  } else {
    return true;
  }
}

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
              <FormControl id="name" isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("name", { required: true })}
                  placeholder="Enter the name of your product..."
                />
                <FormErrorMessage>
                  {errors.name && "The product name is required"}
                </FormErrorMessage>
                <FormHelperText>
                  Requires the product to bear a name
                </FormHelperText>
              </FormControl>

              <FormControl id="description" isInvalid={errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description", { required: true })}
                  placeholder="Describe your product..."
                />
                <FormErrorMessage>
                  {errors.description && "The product description is required"}
                </FormErrorMessage>
                <FormHelperText>
                  Requires the product to carry a brief description
                </FormHelperText>
              </FormControl>

              <FormControl id="url" isInvalid={errors.url}>
                <FormLabel>Enter the url of the article</FormLabel>
                <Input
                  {...register("url", {
                    required: true,
                    validate: validateImage,
                  })}
                  placeholder="https://..."
                  type="file"
                />
                <FormErrorMessage>
                  {errors.url && "The uploaded file is not a valid image"}
                </FormErrorMessage>
                <FormHelperText>
                  You only need a URL. Example: https://www.ahem...
                </FormHelperText>
              </FormControl>

              <FormControl id="price" isInvalid={errors.price}>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="$" />
                  <Input
                    {...register("price", {
                      required: true,
                      pattern: {
                        value: /^(\d{1,3}(\,\d{3})*|(\d+))(\.\d{1,2})?$/,
                        message: "Please enter a valid price",
                      },
                    })}
                    type="number"
                    step="0.01"
                    placeholder="Enter the price of the product..."
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.price && "The product price is required"}
                </FormErrorMessage>
                <FormHelperText>
                  Requires the product to bear a name
                </FormHelperText>
              </FormControl>

              <FormControl id="stock" isInvalid={errors.stock}>
                <FormLabel>Stock</FormLabel>
                <Input
                  {...register("stock", {
                    required: true,
                    pattern: {
                      value: /^[0-9]\d*$/,
                      message: "Please enter a positive number",
                    },
                  })}
                  type="number"
                  min={0}
                  placeholder="Enter the available stock of your product..."
                />
                <FormErrorMessage>
                  {errors.stock && "The product stock is required"}
                </FormErrorMessage>
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
