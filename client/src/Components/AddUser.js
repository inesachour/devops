import React from "react";
import {
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import axios from "axios";
import Popup from "./Common/Popup";

//initial form values
const initialData = {
  name: "",
  email: "",
  designation: "",
};

const AddUser = ({ getUsersData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //create new user function call
  const createUser = (values) => {
    axios
      .post(`http://localhost:5000/create-user`, values)
      .then((res) => {
        getUsersData();
        toast({
          title: res.data.message,
          status: "success",
          isClosable: true,
          position: "bottom",
          duration: 5000,
        });
        onClose();
      })
      .catch((error) => {
        toast({
          title: error.response.data.message,
          status: "error",
          isClosable: true,
          position: "bottom",
          duration: 5000,
        });
        onClose();
      });
  };

  return (
    <div>
      <Button
        colorScheme="teal"
        onClick={onOpen}
        rightIcon={<AddIcon mb={1} />}
      >
        Add User
      </Button>

      <Popup title="Add new user" isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialData}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Name is Required";
            }
            if (!values.email) {
              errors.email = "Email is Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.designation) {
              errors.designation = "Designation is Required";
            }
            return errors;
          }}
          onSubmit={(values) => {
            createUser(values);
          }}
        >
          {({
            values,
            errors,
            isValid,
            touched,
            dirty,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl isRequired mt={8}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  autoComplete="off"
                />
                <Text color="tomato">
                  {errors.name && touched.name && errors.name}
                </Text>
              </FormControl>
              <FormControl isRequired mt={8}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autoComplete="off"
                />
                <Text color="tomato">
                  {errors.email && touched.email && errors.email}
                </Text>
              </FormControl>
              <FormControl isRequired mt={8}>
                <FormLabel>Designation</FormLabel>
                <Input
                  type="text"
                  name="designation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.designation}
                  autoComplete="off"
                />
                <Text color="tomato">
                  {errors.designation &&
                    touched.designation &&
                    errors.designation}
                </Text>
              </FormControl>

              <ButtonGroup variant="outline" spacing="3" my={8}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  disabled={!(isValid && dirty)}
                >
                  Submit
                </Button>

                <Button colorScheme="blue" onClick={onClose} variant="outline">
                  Cancel
                </Button>
              </ButtonGroup>
            </form>
          )}
        </Formik>
      </Popup>
    </div>
  );
};

export default AddUser;
