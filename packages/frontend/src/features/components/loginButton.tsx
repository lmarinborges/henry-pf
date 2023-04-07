import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { LoginPage, RegisterPage } from "./LoginRegisterForm";

const LoginButton = () => {
  //para session
  const [LogIsOpen, setLogIsOpen] = useState(false);

  const onLogClose = () => setLogIsOpen(false);
  const onLogOpen = () => setLogIsOpen(true);
  // para registro
  const [RegIsOpen, setRegIsOpen] = useState(false);

  const onRegClose = () => setRegIsOpen(false);
  const onRegOpen = () => setRegIsOpen(true);

  return (
    <>
      <Button onClick={onLogOpen} fontWeight={"bold"} fontSize={"0.8em"} m={3}>
        Iniciar sesión
      </Button>
      <Button
        onClick={onRegOpen}
        fontWeight={"bold"}
        colorScheme="red"
        fontSize={"0.8em"}
        m={3}
        _hover={{
          bg: "#8B0000",
        }}
      >
        Registrate
      </Button>
      <Modal isOpen={LogIsOpen} onClose={onLogClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <LoginPage SuddenCLose={() => setLogIsOpen(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={RegIsOpen} onClose={onRegClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <RegisterPage SuddenCLose={() => setRegIsOpen(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginButton;
