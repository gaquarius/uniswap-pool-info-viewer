import React from 'react';

import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

import CoinLogo from 'components/CoinLogo';
import Transactions from 'components/Transactions';
import { Main } from 'templates/Main';
import { formatTokenSymbol, formatCurrency } from 'utils/formatter';

const POOL_QUERY = (id: string) =>
  gql(`
    query Pool {
      pool(id: "${id}") {
        totalValueLockedUSD
        token0 {
          id
          name
          symbol
          txCount
        }
        token1 {
          id
          name
          symbol
          txCount
        }
        id
        totalValueLockedToken0
        totalValueLockedToken1
      }
    }`);

const PoolDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(POOL_QUERY(id as string));

  const handleGoToPools = React.useCallback(() => {
    router.push('/pools');
  }, [router]);

  return (
    <Main>
      <div className="flex flex-col mt-4">
        <div
          className="text-lg cursor-pointer text-blue-600 mb-4"
          onClick={handleGoToPools}
        >
          &lt; Back to Pools
        </div>
        {loading ? (
          'Loading ...'
        ) : error ? (
          'Error'
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                <CoinLogo address={data.pool.token0.id} size={24} />
                <CoinLogo address={data.pool.token1.id} size={24} />
                <span className="ml-2">
                  {formatTokenSymbol(data.pool.token0.symbol)}/
                  {formatTokenSymbol(data.pool.token1.symbol)}
                </span>
              </div>
              <div className="bg-blue-700 rounded-lg p-2 text-white cursor-pointer">
                Add to watch list
              </div>
            </div>
            <div className="grid grid-cols-3 bg-gray-900 max-w-xs p-4 rounded-lg mb-4">
              <div className="col-span-2 text-white mb-2">
                Tokens value (USD)
              </div>
              <div className="text-white mb-2">TX Count</div>
              <div className="col-span-2 flex items-center mb-2">
                <CoinLogo address={data.pool.token0.id} size={24} />
                <span className="ml-2">
                  {formatTokenSymbol(data.pool.token0.symbol)}{' '}
                  <b>{formatCurrency(data.pool.totalValueLockedToken0)}</b>
                </span>
              </div>
              <div className="mb-2">{data.pool.token0.txCount}</div>
              <div className="col-span-2 flex items-center">
                <CoinLogo address={data.pool.token1.id} size={24} />
                <span className="ml-2">
                  {formatTokenSymbol(data.pool.token1.symbol)}{' '}
                  <b>{formatCurrency(data.pool.totalValueLockedToken1)}</b>
                </span>
              </div>
              <div>{data.pool.token1.txCount}</div>
            </div>
            <Transactions address={id as string} />
          </>
        )}
      </div>
    </Main>
  );
};

export default PoolDetail;
