import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { getWatchlist } from 'utils/storage';

import PoolList from './PoolList';

const POOL_QUERY = (watchlist: string) => {
  const addressConcatenation = watchlist
    .split(',')
    .map((address) => `"${address}"`)
    .join(',');
  const queryString = `
    query Pools {
      pools(where: {id_in: [${addressConcatenation}]}, orderBy: totalValueLockedUSD, orderDirection: desc) {
        totalValueLockedUSD
        token0 {
          id
          name
          symbol
        }
        token1 {
          id
          name
          symbol
        }
        txCount
        volumeUSD
        id
      }
    }
  `;
  return gql(queryString);
};

const PoolWatchList: React.FC = () => {
  const watchList = getWatchlist();
  const { data, loading } = useQuery(POOL_QUERY(watchList));

  return (
    <div className="my-4">
      <p className="text-2xl mb-2">Pool Watchlist</p>
      <PoolList data={data?.pools || []} loading={loading} />
    </div>
  );
};

export default PoolWatchList;
