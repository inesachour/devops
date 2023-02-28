import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TableContainer,
  Flex,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import EditUpdateUser from "./EditUpdateUser";
import Pagination from "./Common/Pagination";

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const postPerPage = 5;

  //get users Data
  const getUsersData = () => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setEmployeeData(res.data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUsersData();
  }, []);

  // / Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = employeeData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setcurrentPage(pageNumber);
  return (
    <div>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.8s"
          emptyColor="grey"
          color="blue"
          size="lg"
          mt="20"
        />
      ) : employeeData.length > 0 ? (
        <>
          <TableContainer mb={5}>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Designation</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentPosts.map((ele) => (
                  <Tr key={ele._id}>
                    <Td>{ele._id}</Td>
                    <Td>{ele.name}</Td>
                    <Td>{ele.email}</Td>
                    <Td>{ele.designation}</Td>
                    <Td>
                      <Flex gap="2">
                        <DeleteUser
                          userId={ele._id}
                          getUsersData={getUsersData}
                        />
                        <EditUpdateUser
                          userData={ele}
                          getUsersData={getUsersData}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {employeeData.length > 5 && (
            <Pagination
              currentPage={currentPage}
              postPerPage={postPerPage}
              totalPosts={employeeData.length}
              paginate={paginate}
              setcurrentPage={setcurrentPage}
            />
          )}
        </>
      ) : (
        <Heading as="h3" size="lg" my="10">
          No users found!!
        </Heading>
      )}
      <AddUser getUsersData={getUsersData} />
    </div>
  );
};

export default Dashboard;
