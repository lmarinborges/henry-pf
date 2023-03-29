import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { AiFillHome } from "react-icons/ai";
import { FaShoppingCart, FaUserAlt, FaUsers } from "react-icons/fa";
import { MdFitnessCenter, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

import s from "./NavBar.module.css";

export const Navbar = () => {
  return (
    <>
      <div className={s.contain_barra}>
        <Menu>
          <MenuButton
            height="40px"
            width="40px"
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon width="20px" height="20px" />}
            color="white"
          />
          <MenuList>
            <Box width="15rem" color="white">
              <Link to="home">
                <MenuItem color="white">
                  <AiFillHome className={s.item_emojis} />
                  Home
                </MenuItem>
              </Link>
              <Link to="products">
                <MenuItem color="white">
                  <MdFitnessCenter className={s.item_emojis} />
                  Products
                </MenuItem>
              </Link>

              <Link to="about">
                <MenuItem color="white">
                  <FaUsers className={s.item_emojis} />
                  About
                </MenuItem>
              </Link>
              <Link to="contact">
                <MenuItem color="white">
                  <MdEmail className={s.item_emojis} />
                  contact
                </MenuItem>
              </Link>
            </Box>
          </MenuList>
        </Menu>

        <div className={s.div_barra}>
          <Link to="user">
            <FaUserAlt className={s.barra_emojis_user} />
          </Link>
          <Link to="shopping">
            <FaShoppingCart className={s.barra_emojis_shop} />
          </Link>
        </div>
      </div>
    </>
  );
};
