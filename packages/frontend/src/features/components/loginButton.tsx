import {
  Button,
  Menu,
  MenuButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Avatar,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { logoutUser } from "../../redux/actions";
import { LoginPage, RegisterPage } from "./LoginRegisterForm";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

interface user {
  name: string;
  email: string;
  state: string;
}
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
      <Button
        onClick={onLogOpen}
        fontWeight={"bold"}
        fontSize={"0.8em"}
        my="4"
        m={3}
      >
        Iniciar sesión
      </Button>
      <Button
        onClick={onRegOpen}
        fontWeight={"bold"}
        colorScheme="red"
        fontSize={"0.8em"}
        m={3}
        my="4"
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

function LoggedButton(user: user) {
  const dispatch: AppDispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    console.log("deslogueado");
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<i className="fas fa-caret-down"></i>}
        variant="link"
        fontSize="sm"
        fontWeight="medium"
        borderRadius="md"
        py="1"
        my="4"
      >
        <Avatar name={user.name} size="sm" mr="2" />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <i className="fas fa-sign-out-alt mr-2"></i>
          {user.name}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <i className="fas fa-sign-out-alt mr-2"></i>
          Desconectar
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function UserMenu() {
  const [isUser, setIsUser] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log(user);
    if (user.name) {
      setIsUser(true);
    }
  }, []);

  useEffect(() => {
    console.log(user);
    if (user.name) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [user]);

  return (
    <>
      <Box visibility={isUser ? "hidden" : "visible"}>{LoginButton()}</Box>;
      <Box visibility={isUser ? "visible" : "hidden"}>{LoggedButton(user)}</Box>
      ;
    </>
  );
}

export default UserMenu;
