import React from "react";
import { ListItem, UnorderedList } from "@chakra-ui/react";

const Pagination = ({
  postPerPage,
  totalPosts,
  currentPage,
  paginate,
  setcurrentPage,
}) => {
  const totalNumberOfPages = Math.ceil(totalPosts / postPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <UnorderedList id="pagination">
      <ListItem
        className="page-item"
        style={{ cursor: currentPage !== 1 ? "pointer" : "not-allowed" }}
        onClick={() => {
          currentPage !== 1 && setcurrentPage((currentPage) => currentPage - 1);
        }}
      >
        Prev
      </ListItem>
      {pageNumbers.map((number) => (
        <ListItem
          key={number}
          className={`page-item ${currentPage === number ? "active" : ""}`}
          onClick={() => paginate(number)}
        >
          <p className="page-link">{number}</p>
        </ListItem>
      ))}
      <ListItem
        className="page-item"
        style={{
          cursor:
            currentPage !== totalNumberOfPages ? "pointer" : "not-allowed",
        }}
        onClick={() => {
          currentPage !== totalNumberOfPages &&
            setcurrentPage((currentPage) => currentPage + 1);
        }}
      >
        Next
      </ListItem>
    </UnorderedList>
  );
};

export default Pagination;
