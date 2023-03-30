import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  LayoutProps,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MdAlternateEmail,
  MdHome,
  MdPerson,
  MdShoppingBag,
  MdShoppingCart,
} from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

export interface NavbarProps {
  height: LayoutProps["height"];
}

const DRAWER_ITEMS = [
  { label: "Home", icon: MdHome, to: "/home" },
  { label: "Sobre Nosotros", icon: MdPerson, to: "/about" },
  { label: "Productos", icon: MdShoppingBag, to: "/products" },
  { label: "Contacto", icon: MdAlternateEmail, to: "/contact" },
];

export default function Navbar(props: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        as="header"
        alignItems="center"
        height={props.height}
        position="fixed"
        width="full"
        justifyContent="space-between"
        px="2"
        backdropFilter="blur(8px)"
        boxShadow="sm"
      >
        <IconButton
          _hover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
          _active={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          variant="ghost"
          borderRadius="full"
          aria-label="Abrir menú"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
        <IconButton
          _hover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
          _active={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          color="rgba(0, 0, 0, 0.68)"
          variant="ghost"
          borderRadius="full"
          aria-label="Ver carrito de compras"
          icon={<MdShoppingCart />}
        />
      </Flex>
      <Drawer size="xs" placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            paddingX="5"
            paddingY="2.5"
            borderBottomWidth="1px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text mt="1.5">Menú</Text>
            <DrawerCloseButton position="unset" borderRadius="full" />
          </DrawerHeader>
          <Flex flexDirection="column">
            {DRAWER_ITEMS.map((value, index) => (
              <Link
                paddingX="6"
                paddingY="3"
                display="flex"
                alignItems="center"
                gap="6"
                _hover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                _active={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                as={RouterLink}
                to={value.to}
                onClick={onClose}
              >
                <Icon as={value.icon} width="6" height="6" mb="0.5" />
                {value.label}
              </Link>
            ))}
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
}
