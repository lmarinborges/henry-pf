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
  apellidos: string;
  tel: number;
  email: string;
  direction: string;
  barrio: string;
  ncasa: number;
  piso: number;
  cp: number;
};

let BuyForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();


let onSubmit = (data: any) => {
    console.log(data);
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
                                {...register("apellidos", { required: true })}
                              />
                              {errors.apellidos && (
                                <Text color="tomato">
                                  Requiere que ingrese apellido
                                </Text>
                              )}
                            </FormControl>
                          </HStack>

                          <FormControl>
                            <FormLabel>Numero de telefono:</FormLabel>
                            <Input
                              borderColor="black"
                              {...register("tel", { required: true })}
                            />
                            {errors.tel && (
                              <Text color="tomato">
                                Ingrese un número de telefono
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
                            <FormLabel>Direccion</FormLabel>
                            <Input
                              borderColor="black"
                              {...register("direction", { required: true })}
                            />
                            {errors.direction && (
                              <Text color="tomato">
                                Ingrese la dirección de su domicilio
                              </Text>
                            )}
                          </FormControl>

                          <HStack>
                            <FormControl>
                              <FormLabel>Barrio</FormLabel>
                              <Input
                                borderColor="black"
                                {...register("barrio", { required: true })}
                              />
                              {errors.barrio && (
                                <Text color="tomato">
                                  Ingrese el nombre del barrio
                                </Text>
                              )}
                            </FormControl>

                            <FormControl>
                              <FormLabel>N de casa</FormLabel>
                              <Input
                                borderColor="black"
                                {...register("ncasa", { required: true })}
                              />
                            </FormControl>
                          </HStack>
                          <HStack>
                            <FormControl>
                              <FormLabel>Piso</FormLabel>
                              <Input
                                borderColor="black"
                                {...register("piso", { required: true })}
                              />
                            </FormControl>

                            <FormControl>
                              <FormLabel>C.P.</FormLabel>
                              <Input
                                borderColor="black"
                                {...register("cp", { required: true })}
                              />
                              {errors.cp && (
                                <Text color="tomato">
                                  Por favor, increse su código postal
                                </Text>
                              )}
                            </FormControl>
                          </HStack>

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
