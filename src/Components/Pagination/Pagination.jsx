import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  // pageCount,
  currentPage,
  canNextPage,
  canPreviousPage,
  goToPreviousPage,
  goToNextPage,
  // goToPage,
}) => (
  <div className="pagination">
    <button
      className="pagination__button pagination__button--previous"
      type="button"
      onClick={goToPreviousPage}
      disabled={!canPreviousPage}
    >
      <div className="pagination__image">
        <svg width="6" height="9" viewBox="0 0 6 9" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.187288 3.92721L3.80542 0.193358C4.05549 -0.0647165 4.45987 -0.0647164 4.70729 0.193358L5.30854 0.813838C5.55861 1.07191 5.55861 1.48923 5.30854 1.74455L2.74392 4.3912L5.30854 7.03784C5.55861 7.29592 5.55861 7.71323 5.30854 7.96856L4.70995 8.59453C4.45987 8.8526 4.05549 8.8526 3.80808 8.59453L0.189948 4.86068C-0.0627886 4.6026 -0.062789 4.18529 0.187288 3.92721Z" fill="currentColor" />
        </svg>
      </div>
    </button>
    <div className="pagination__text pagination__text--current">
      {currentPage}
    </div>
    <button
      className="pagination__button pagination__button--next"
      type="button"
      onClick={goToNextPage}
      disabled={!canNextPage}
    >
      <div className="pagination__image">
        <svg width="6" height="9" viewBox="0 0 6 9" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.30881 4.86087L1.69068 8.59473C1.4406 8.8528 1.03622 8.8528 0.788805 8.59473L0.187557 7.97425C-0.0625191 7.71617 -0.0625191 7.29886 0.187557 7.04353L2.75217 4.39689L0.187557 1.75024C-0.0625191 1.49217 -0.0625191 1.07486 0.187557 0.819526L0.786145 0.193556C1.03622 -0.0645188 1.4406 -0.0645188 1.68802 0.193556L5.30615 3.92741C5.55888 4.18549 5.55888 4.6028 5.30881 4.86087Z" fill="currentColor" />
        </svg>
      </div>
    </button>
  </div>
);

Pagination.propTypes = {
  // pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  canPreviousPage: PropTypes.bool,
  canNextPage: PropTypes.bool,
  goToPreviousPage: PropTypes.func,
  goToNextPage: PropTypes.func,
  // goToPage: PropTypes.func,
};

Pagination.defaultProps = {
  // pageCount: 1,
  currentPage: 1,
  canPreviousPage: false,
  canNextPage: false,
  goToPreviousPage: () => null,
  goToNextPage: () => null,
  // goToPage: () => null,
};

export default Pagination;
