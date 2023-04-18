import {
  Container,
  Button,
  Box,
  Flex,
  Wrap,
  WrapItem,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
type Form = {
  name: string;
  surname: string;
  adress:{
    street_number: number;
    street_name: string;
  }
  email: string;
  zip_code: number;
};

let BuyForm = (props:any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();


let onSubmit = (data: any) => {
    props.onBuy(data)
    reset()
  };

  return (
    <Box>
      <Container maxW="full" mt={0} centerContent overflow="hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <Box
              color="white"
              borderRadius="lg"
              m={{ sm: 4, md: 16, lg: 10 }}
              p={{ sm: 5, md: 5, lg: 16 }}
            >
              <Box>
                <Wrap>
                  <WrapItem>
                    <Box bg="white" borderRadius="lg">
                      <Box m={8} color="#0B0E3F">
                        <VStack spacing={5}>
                          <HStack>
                            <FormControl>
                              <FormLabel>Nombres:</FormLabel>
                              <Input
                                borderColor="black"
                                {...register("name", { required: true })}
                              />
                              {errors.name && (
                                <Text color="tomato">Requiere nombre</Text>
                              )}
                            </FormControl>

                            <FormControl>
                              <FormLabel>Apellido:</FormLabel>
                              <Input
                                borderColor="black"
                                {...register("surname", { required: true })}
                              />
                              {errors.surname && (
                                <Text color="tomato">
                                  Requiere que ingrese apellido
                                </Text>
                              )}
                            </FormControl>
                          </HStack>
                                         
                          <FormControl>
                            <FormLabel>Direccion</FormLabel>
                            <Input
                              borderColor="black"
                              {...register("adress.street_name", { required: true })}
                            />
                            {errors.adress?.street_name && (
                              <Text color="tomato">
                                Ingrese la calle de su domicilio
                              </Text>
                            )}
                          </FormControl>

                          <FormControl>
                            <FormLabel>Numero (direccion)</FormLabel>
                            <Input
                              borderColor="black"
                              {...register("adress.street_number", { required: true })}
                            />
                            {errors.adress?.street_number && (
                              <Text color="tomato">
                                Ingrese altura de calle
                              </Text>
                            )}
                          </FormControl>

                          <FormControl>
                            <FormLabel>Correo Electronico:</FormLabel>
                            <Input
                              borderColor="black"
                              {...register("email", { required: true })}
                            />
                            {errors.email && (
                              <Text color="tomato">
                                Ingrese su correo electrónico
                              </Text>
                            )}
                          </FormControl>

                            <FormControl>
                              <FormLabel>C.P.</FormLabel>
                              <Input
                                borderColor="black"
                                {...register("zip_code", { required: true })}
                              />
                              {errors.zip_code && (
                                <Text color="tomato">
                                  Por favor, increse su código postal
                                </Text>
                              )}
                            </FormControl>
                       

                          <FormControl float="right">
                            <Button
                              variant="solid"
                              bg="#0D74FF"
                              color="white"
                              type="submit"
                            >
                              Solicitar Pago
                            </Button>
                          </FormControl>
                        </VStack>
                      </Box>
                    </Box>
                  </WrapItem>
                </Wrap>
              </Box>
            </Box>
          </Flex>
        </form>
      </Container>
    </Box>
  );
};

export default BuyForm;
