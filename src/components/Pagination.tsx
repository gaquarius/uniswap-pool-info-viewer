import React from 'react';

import classNames from 'classnames';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev?: () => void;
  onNext?: () => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}) => {
  const handlePrevPage = React.useCallback(() => {
    if (currentPage > 1 && onPrev) {
      onPrev();
    }
  }, [currentPage, onPrev]);

  const handleNextPage = React.useCallback(() => {
    if (currentPage < totalPages && onNext) {
      onNext();
    }
  }, [currentPage, totalPages, onNext]);
  return (
    <div className="flex">
      <span
        className={classNames('cursor-pointer px-4 select-none', {
          'opacity-30': currentPage === 1,
        })}
        onClick={handlePrevPage}
      >
        ←
      </span>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <span
        className={classNames('cursor-pointer px-4 select-none', {
          'opacity-30': currentPage === totalPages,
        })}
        onClick={handleNextPage}
      >
        →
      </span>
    </div>
  );
};

export default Pagination;
