import React from 'react';
import styled from 'styled-components';
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const PageButtonGroup = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const PageButton = styled.button`
  width: 36px;
  padding: 8px 0px;
  display: grid;
  place-items: center;
  border: none;
  border-left: 1px solid #ddd;
  background-color: ${props => (props.$active ? '#649eff' : 'white')};
  color: ${props => (props.$active ? 'white' : 'black')};
  cursor: pointer;
  font-size: 14px;

  &:first-child {
    border-left: none;
  }

  &:hover:not(:disabled) {
    background-color: #f0f6ff;
  }

  &:disabled {
    background-color: #f9f9f9;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbersToShow = 5;
  const pageGroup = Math.ceil(currentPage / pageNumbersToShow);
  const startPage = (pageGroup - 1) * pageNumbersToShow + 1;
  const endPage = Math.min(startPage + pageNumbersToShow - 1, totalPages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <PaginationContainer>
      <PageButtonGroup>
        <PageButton onClick={() => onPageChange(1)} disabled={currentPage === 1} aria-label="첫 페이지">
          <FiChevronsLeft />
        </PageButton>
        <PageButton onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} aria-label="이전 페이지">
          <FiChevronLeft />
        </PageButton>
        {pageNumbers.map(number => (
          <PageButton
            key={number}
            $active={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </PageButton>
        ))}
        <PageButton onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} aria-label="다음 페이지">
          <FiChevronRight />
        </PageButton>
        <PageButton onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} aria-label="마지막 페이지">
          <FiChevronsRight />
        </PageButton>
      </PageButtonGroup>
    </PaginationContainer>
  );
};

export default Pagination;
