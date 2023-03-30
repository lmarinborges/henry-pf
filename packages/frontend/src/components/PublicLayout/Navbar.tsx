import { HamburgerIcon } from "@chakra-ui/icons";
import { MdShoppingCart } from "react-icons/md";
import { Flex, IconButton, LayoutProps } from "@chakra-ui/react";

export interface NavbarProps {
  height: LayoutProps["height"];
}

export default function Navbar(props: NavbarProps) {
  return (
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
  );
}
