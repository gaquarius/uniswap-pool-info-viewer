import { PAGE_SIZE } from 'constants';

import React from 'react';

import type { Transaction } from 'interfaces/Transaction';
import {
  formatCurrency,
  formatTime,
  fromTransactionType,
  reduceEtherscanURL,
} from 'utils/formatter';

import Pagination from './Pagination';

interface ITransactionListProps {
  data: Transaction[];
}

const TransactionList: React.FC<ITransactionListProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filteredData, setFilteredData] = React.useState<Transaction[]>([]);

  React.useEffect(() => {
    setFilteredData(
      data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    );
  }, [data, currentPage]);

  const totalPages = React.useMemo(() => {
    return Math.ceil(data.length / PAGE_SIZE);
  }, [data]);

  const handlePrevPage = React.useCallback(() => {
    setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const handleNextPage = React.useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  return (
    <div className="grid-cols-4 auto-rows-auto gap-2 rounded-lg p-4 font-semibold bg-gray-900">
      <div className="grid grid-cols-transaction-list border-b border-gray-800 h-8">
        <span>Link to Etherscan</span>
        <span>Tx Type</span>
        <span>Token Amount (USD)</span>
        <span>Timestamp</span>
      </div>
      {filteredData.map((info, idx) => (
        <div
          key={`transaction-list-info-${info.transaction.id}-${idx}`}
          className="grid grid-cols-transaction-list border-b border-gray-800 h-16 items-center"
        >
          <div>
            <a
              href={`https://etherscan.io/tx/${info.transaction.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {reduceEtherscanURL(
                `https://etherscan.io/tx/${info.transaction.id}`
              )}
            </a>
          </div>
          <span>{fromTransactionType(info.type!)}</span>
          <span>{formatCurrency(parseFloat(info.amountUSD))}</span>
          <span>{formatTime(parseInt(info.timestamp, 10))}</span>
        </div>
      ))}
      <div className="flex items-center justify-center h-16">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </div>
    </div>
  );
};

export default TransactionList;
