import { PAGE_SIZE } from 'constants';

import React from 'react';

import { useRouter } from 'next/router';

import { Pool } from 'interfaces/Pool';
import { formatCurrency, formatTokenSymbol } from 'utils/formatter';

import CoinLogo from './CoinLogo';
import Pagination from './Pagination';

interface IPoolListProps {
  data: Pool[];
}

const PoolList: React.FC<IPoolListProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filteredData, setFilteredData] = React.useState<Pool[]>([]);
  const router = useRouter();

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

  const handlePoolDetails = React.useCallback(
    (id) => () => {
      router.push(`pools/${id}`);
    },
    [router]
  );

  return (
    <div className="grid-cols-4 auto-rows-auto gap-2 rounded-lg p-4 font-semibold bg-gray-900">
      <div className="grid grid-cols-pool-list border-b border-gray-800 h-8">
        <span>Pool</span>
        <span>Tx Count</span>
        <span>TVL (USD)</span>
        <span>Volume (USD)</span>
      </div>
      {filteredData.map((info) => (
        <div
          key={`pool-list-info-${info.id}`}
          className="grid grid-cols-pool-list border-b border-gray-800 h-16 items-center cursor-pointer"
          onClick={handlePoolDetails(info.id)}
        >
          <div className="flex items-center">
            <CoinLogo address={info.token0.id} size={24} />
            <CoinLogo address={info.token1.id} size={24} />
            <span className="ml-2">
              {formatTokenSymbol(info.token0.symbol)}/
              {formatTokenSymbol(info.token1.symbol)}
            </span>
          </div>
          <div className="uppercase">{info.txCount}</div>
          <div className="uppercase">
            {formatCurrency(parseFloat(info.totalValueLockedUSD))}
          </div>
          <div className="uppercase">
            {formatCurrency(parseFloat(info.volumeUSD))}
          </div>
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

export default PoolList;
