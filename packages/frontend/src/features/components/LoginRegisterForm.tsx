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
import { useState } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AxiosError } from "axios";

const LoginPage = ({ SuddenCLose }) => {
  const [authenticated, setIsAuthenticated] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/localLogin",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true, // permite recibir cookies del servidor
        }
      );
      const { state, user } = response.data;
      if (state === "success") {
        // La autenticación fue exitosa, hacer algo con los datos del usuario
        console.log(`Bienvenido ${user.email}!`);
        //el modal se cierra
        SuddenCLose();
        setIsAuthenticated(true);
      } else {
        // La autenticación falló, hacer algo en consecuencia
        alert("la autenticacion falló");
        console.log("La autenticación falló");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function loginWithFacebook() {
    const width = 600;
    const height = 400;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const authWindow = window.open(
      "http://localhost:4000/auth/facebook",
      "facebook-login",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    if (authWindow == null) {
      throw Error("no se puede llamar al login");
    }

    const handleAuthResponse = (event: any) => {
      if (event.origin !== "http://localhost:4000") return;
      if (event.data.isAuthenticated) {
        console.log(event.data);
        SuddenCLose();
        setIsAuthenticated(true);
      }
    };

    window.addEventListener("message", handleAuthResponse);

    const intervalId = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(intervalId);
        window.removeEventListener("message", handleAuthResponse);
      }
    }, 1000);
  }

  return (
    <Box p={4} h="100%">
      <Box m="7%">
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
  const [authenticated, setIsAuthenticated] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values: any) => {
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: "USER", //por defecto
      state: "active", // por defecto por ahora
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/users",
        userData
      );
      if (response.data.state === "success") {
        alert("Bienvenido, revisa tu correo e inicia session");
        const response = await axios.post(
          "http://localhost:4000/localLogin",
          {
            email: values.email,
            password: values.password,
          },
          {
            withCredentials: true, // permite recibir cookies del servidor
          }
        );
        const { state, user } = response.data;
        if (state === "success") {
          // La autenticación fue exitosa, hacer algo con los datos del usuario
          console.log(`Bienvenido ${user.email}!`);
          //el modal se cierra
          SuddenCLose();
          setIsAuthenticated(true);
        } else {
          // La autenticación falló, hacer algo en consecuencia
          alert("la autenticacion falló");
          console.log("La autenticación falló");
        }
      }
      return response.data;
    } catch (error: any) {
      console.error(error.response?.data);
      alert(
        error.response?.data?.message ??
          "Ocurrió un error al procesar la solicitud"
      );
    }
  };
  function loginWithFacebook() {
    const width = 600;
    const height = 400;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const authWindow = window.open(
      "http://localhost:4000/auth/facebook",
      "facebook-login",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    if (authWindow == null) {
      throw Error("no se puede llamar al login");
    }

    const handleAuthResponse = (event: any) => {
      if (event.origin !== "http://localhost:4000") return;
      if (event.data.isAuthenticated) {
        console.log(event.data);
        SuddenCLose();
        setIsAuthenticated(true);
      }
    };

    window.addEventListener("message", handleAuthResponse);

    const intervalId = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(intervalId);
        window.removeEventListener("message", handleAuthResponse);
      }
    }, 1000);
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
