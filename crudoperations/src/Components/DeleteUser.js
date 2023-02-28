import React from "react";
import {
  Button,
  Text,
  Flex,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import Popup from "./Common/Popup";

const DeleteUser = ({ userId, getUsersData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //delete user function call
  const confirmDelete = () => {
    axios
      .delete(`http://localhost:5000/delete/${userId}`)
      .then((res) => {
        getUsersData();
        toast({
          title: res.data.message,
          status: "success",
          isClosable: true,
          position: "bottom",
          duration: 2000,
        });
        onClose();
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <Button
        colorScheme="red"
        onClick={onOpen}
        rightIcon={<DeleteIcon mb={1} />}
      >
        Delete
      </Button>

      <Popup title="Delete user" isOpen={isOpen} onClose={onClose}>
        <Flex direction="column">
          <Text fontSize="lg">Are you sure? You wan't to delete this.</Text>
          <Flex my={5} gap="2">
            <Button
              colorScheme="grey"
              onClick={onClose}
              color="black"
              variant="outline"
            >
              Cancel
            </Button>

            <Button colorScheme="red" text="Delete" onClick={confirmDelete}>
              Delete
            </Button>
          </Flex>
        </Flex>
      </Popup>
    </div>
  );
};

export default DeleteUser;
