import React, { useState } from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  padding-top: 24px;
`;
const PaginationDetail = styled.div`
  display: flex;
  justify-content: center;
`;
const PaginationButton = styled.button`
  background-color: #ffffff;
  border: 0;
  cursor: pointer;
`;
const PagerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Page = styled.button`
  font-size: 16px;
  background-color: #ffffff;
  border: 0;
  cursor: pointer;
  ${(props) =>
    props.$active &&
    `
    font-size: 18px;
    font-weight: bold;
    text-decoration: underline;
  `}
`;
cd;
const PaginationInfo = styled.div`
  padding-top: 12px;
  font-size: 16px;
  text-align: center;
`;
const EmptyDiv = styled.div`
  width: 22px;
  height: 22px;
`;
const Button = ({ onClick, children }) => {
  return (
    <PaginationButton type="button" onClick={onClick}>
      {children}
    </PaginationButton>
  );
};
const Pager = ({ currentPage, setCurrentPage, pagination, onChange }) => {
  return (
    <PagerWrapper>
      {pagination.map((page) => (
        <Page
          $active={currentPage === page}
          onClick={() => {
            setCurrentPage(page);
            onChange(page);
          }}
        >
          {page}
        </Page>
      ))}
    </PagerWrapper>
  );
};

const Pagination = ({
  totalPage,
  defaultCurrentPage,
  pagination,
  onChange,
}) => {
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  return (
    <PaginationWrapper>
      <PaginationDetail>
        {currentPage > 2 ? (
          <Button
            onClick={() => {
              if (currentPage < 3) return;
              setCurrentPage(1);
              onChange(1);
            }}
          >
            &lt;&lt;
          </Button>
        ) : (
          <EmptyDiv />
        )}
        {currentPage !== 1 ? (
          <Button
            onClick={() => {
              if (currentPage < 2) return;
              setCurrentPage(currentPage - 1);
              onChange(currentPage - 1);
            }}
          >
            &lt;
          </Button>
        ) : (
          <EmptyDiv />
        )}
        <Pager
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagination}
          onChange={onChange}
        />
        {currentPage !== totalPage ? (
          <Button
            onClick={() => {
              if (currentPage >= totalPage) return;
              setCurrentPage(currentPage + 1);
              onChange(currentPage + 1);
            }}
          >
            &gt;
          </Button>
        ) : (
          <EmptyDiv />
        )}
        {currentPage < totalPage - 1 ? (
          <Button
            onClick={() => {
              setCurrentPage(totalPage);
              onChange(totalPage);
            }}
          >
            &gt;&gt;
          </Button>
        ) : (
          <EmptyDiv />
        )}
      </PaginationDetail>
      <PaginationInfo>共 {totalPage} 頁</PaginationInfo>
    </PaginationWrapper>
  );
};

export default Pagination;
