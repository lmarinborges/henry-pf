import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const NAVBAR_HEIGHT = "48px";

export default function PublicLayout() {
  return (
    <>
      <Navbar height={NAVBAR_HEIGHT} />
        <Container
          size="sm"
          px="3"
          pb="3"
          pt={`calc(${NAVBAR_HEIGHT} + var(--chakra-sizes-3))`}
        >
        </Container>
        <Outlet />
      <Footer />
    </>
  );
}
