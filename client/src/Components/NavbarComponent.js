import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const NavbarComponent = () => {
  return (
    <Flex py={5} px={4} justify="center" bg="teal.600">
      <Text fontWeight="bold" color="white" fontSize="2xl">
        Employee Data
      </Text>
    </Flex>
  );
};

export default NavbarComponent;
