import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AxiosError } from "axios";
import {
  addUserFromFb,
  addUserFromLocal,
  registerUser,
} from "../../redux/actions";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const LoginPage = ({ SuddenCLose }) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const user = useSelector((state: RootState) => state.user);
  const onSubmit = async (values: any) => {
    dispatch(addUserFromLocal(values));
  };
  useEffect(() => {
    console.log(user);
    if (user.name) {
      SuddenCLose();
    }
  }, [user]);
  function loginWithFacebook() {
    dispatch(addUserFromFb());
  }

  return (
    <Box p={4} h="100%">
      <Box m="7%">
        <Heading as="h2" size="lg" mb={4}></Heading>
        <Heading as="h2" size="lg" mb={4}>
          Iniciar Sesión
        </Heading>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "EL valor ingresado no es un email válido",
                },
              })}
              placeholder="tu@email.com"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "min length is 8",
                },
              })}
              placeholder="contraseña"
            />
          </FormControl>
          <Button
            type="submit"
            _hover={{
              bg: "#8B0000",
            }}
            display={"block"}
            mx={"auto"}
            my={4}
            colorScheme="red"
          >
            Iniciar Sesión
          </Button>
        </form>
        <HStack flexDirection={"column"}>
          <Box flex="1" w={"100%"}>
            <Button
              onClick={loginWithFacebook}
              w="100%"
              my={"3%"}
              colorScheme="facebook"
              leftIcon={<FaFacebook />}
            >
              Inicia sesion con Facebook
            </Button>
          </Box>
          <Box flex="1" w={"100%"}>
            <Button
              w="100%"
              my={"3%"}
              colorScheme="twitter"
              leftIcon={<FaTwitter />}
            >
              Inicia sesion con Twitter
            </Button>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

const RegisterPage = ({ SuddenCLose }) => {
  const dispatch: AppDispatch = useDispatch();
  const [authenticated, setIsAuthenticated] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const user = useSelector((state: RootState) => state.user);
  const onSubmit = async (values: any) => {
    dispatch(registerUser(values));
  };
  useEffect(() => {
    console.log(user);
    if (user.name) {
      SuddenCLose();
    }
  }, [user]);
  function loginWithFacebook() {
    dispatch(addUserFromFb());
  }

  return (
    <Box p={4} h="100%">
      <Box m="7%">
        <Heading as="h2" size="lg" mb={4}>
          Registrate
        </Heading>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="name" isRequired>
            <FormLabel>Nombre Completo</FormLabel>
            <Input
              type="text"
              {...register("name", {
                required: true,
                minLength: {
                  value: 4,
                  message: "min length is 8",
                },
              })}
              placeholder="Name"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "EL valor ingresado no es un email válido",
                },
              })}
              placeholder="tu@email.com"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "min length is 8",
                },
              })}
              placeholder="contraseña"
            />
          </FormControl>
          <Button
            type="submit"
            _hover={{
              bg: "#8B0000",
            }}
            display={"block"}
            mx={"auto"}
            my={4}
            colorScheme="red"
          >
            Iniciar Sesión
          </Button>
        </form>
        <HStack flexDirection={"column"}>
          <Box flex="1" w={"100%"}>
            <Button
              onClick={loginWithFacebook}
              w="100%"
              my={"3%"}
              colorScheme="facebook"
              leftIcon={<FaFacebook />}
            >
              Inicia sesion con Facebook
            </Button>
          </Box>
          <Box flex="1" w={"100%"}>
            <Button
              w="100%"
              my={"3%"}
              colorScheme="twitter"
              leftIcon={<FaTwitter />}
            >
              Inicia sesion con Twitter
            </Button>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export { LoginPage, RegisterPage };
